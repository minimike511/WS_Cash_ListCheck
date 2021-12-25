import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredtTitle = '';
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;
  isChecked = false;

  constructor(public postsService: PostService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            date: postData.date,
            returned: postData.returned,
            comment: postData.comment
          };
          this.isChecked = postData.returned;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      console.log('invalid');
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(
        form.value.title,
        form.value.date,
        this.isChecked,
        form.value.comment
      );
    } else {
      this.postsService.updatePost(
        this.post.id,
        form.value.title,
        form.value.date,
        this.isChecked,
        form.value.comment);
    }
    form.resetForm();
  }
}
