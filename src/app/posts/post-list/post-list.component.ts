import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { PageEvent } from "@angular/material";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  
  posts: Post[] = [];
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;

  isLoading= false;
  totalPost = 0;
  postPerPage = 2;
  pageSizeOptions = [ 1,2, 5,10];
  currentPage = 1 ;
  constructor(public postsService: PostsService, private AuthService: AuthService) {}

  ngOnInit() {
    this.isLoading=true;

    // reciving posts
    this.postsService.getPosts(this.postPerPage, this.currentPage);
    this.userId= this.AuthService.getUserId();

    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData:{posts: Post[], postCount: number}) => {
        this.isLoading=false;
        this.totalPost =postData.postCount;
        this.posts = postData.posts;
      });


      //check if already loged in 
      this.userIsAuthenticated= this.AuthService.getIsAuth();
     this.authStatusSub= this.AuthService.getAuthStatusListner().subscribe(isAutenticated => {
      this.userIsAuthenticated = isAutenticated;
      this.userId= this.AuthService.getUserId();
     });
  }

  onDelete(id: string){
    this.isLoading=true;
   this. postsService.deletePost(id).subscribe( () => {
     this.postsService.getPosts(this.postPerPage, this.currentPage);

   }, () => {
      this.isLoading = false;  
   })
   ;
  }


  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading= true;
    this.currentPage = pageData.pageIndex +1;
    this.postPerPage = pageData.pageSize ;
    this.postsService.getPosts(this.postPerPage,this.currentPage);

  }
}
