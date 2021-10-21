export class PostRequest {
  postId!: number;
  title!: string;
  image!: string;
  content!: string;
  status!: boolean;
  categoryId!: number;
  createdDate!: Date;
  createdBy!: string;
  modifiedDate!: Date;
  modifiedBy!: string;
}
