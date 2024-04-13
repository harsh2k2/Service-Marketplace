import { useForm } from "react-hook-form";

const BlogForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Blog Title"
        {...register("Blog Title", { required: true })}
      />
      <input
        type="text"
        placeholder="Blog Description"
        {...register("Blog Description", { required: true })}
      />

      <input type="submit" />
    </form>
  );
};

export default BlogForm;
