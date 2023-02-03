import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LottieComponent from "../../../components/animations/Lottie";
import CourseForm from "../../../components/forms/CourseForm";
import ToastComponent from "../../../components/toast";
import { ICategory } from "../../../interfaces";
import { RootState } from "../../../store";
import {
  CategoryDispatch,
  fetchCategories,
} from "../../../store/slices/course/category/categorySlice";
import {
  fetchTags,
  TagDispatch,
} from "../../../store/slices/course/tag/tagSlice";
import { toastFailed, toastSuccess } from "../../../utils/util";
import loading from "../../../assets/wave-loading.json";
import "./styles.scss";

export default function CourseCreatePage() {
  const [cookies] = useCookies(["admin_token"]);
  const API_URL = process.env.REACT_APP_API__URL_AUTH_ADMIN;
  const navigate = useNavigate();
  const [courseLoading, setCourseLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    title: string;
    category: string;
    tags: string;
    price: string;
    summaryDesc: string;
    content: string;
    author: string;
    img: string;
  }>({
    title: "",
    category: "",
    tags: "",
    price: "",
    summaryDesc: "",
    content: "",
    author: "",
    img: "",
  });

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<ICategory>({ id: 0, name: "" });
  const [currentTags, setCurrentTags] =
    useState<{ value: string; label: string }[]>();
  const [price, setPrice] = useState<number>(0);
  const [summaryDesc, setSummaryDesc] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [img, setImg] = useState<File>();
  const [imgPreview, setImgPreview] = useState<string>("");
  const [status, setStatus] = useState<string>("active");

  const { tags } = useSelector((state: RootState) => state.tag);
  const { categories } = useSelector((state: RootState) => state.category);
  const tagDispatch: TagDispatch = useDispatch();
  const categoryDispatch: CategoryDispatch = useDispatch();
  useEffect(() => {
    tagDispatch(fetchTags());
  }, [tagDispatch]);

  useEffect(() => {
    categoryDispatch(fetchCategories());
  }, [categoryDispatch]);

  const validateErrors = (name: string, value: any) => {
    let error = "";
    if (name === "title") {
      if (value === "") {
        error = "Title is required";
      }
    }

    if (name === "category") {
      if (value === 0) {
        error = "Category is required";
      }
    }

    if (name === "tags") {
      if (value.length === 0) {
        error = "Tags is required";
      }
    }

    if (name === "price") {
      if (value < 0) {
        error = "Price cannot be negative";
      }
    }

    if (name === "summaryDesc") {
      if (value === "") {
        error = "Summary description is required";
      }
    }

    if (name === "content") {
      if (value === "") {
        error = "Content is required";
      }
    }

    if (name === "author") {
      if (value === "") {
        error = "Author is required";
      }
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateErrors(e.target.name, e.target.value);
    setTitle(e.target.value);
  };
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateErrors(e.target.name, e.target.value);
    setAuthor(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateErrors(e.target.name, e.target.value);
    setPrice(parseInt(e.target.value));
  };

  const handleSummaryDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateErrors(e.target.name, e.target.value);
    setSummaryDesc(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    validateErrors(e.target.name, e.target.value);
    setContent(e.target.value);
  };

  const handleTagChange = (newValue: any, actionMeta: any) => {
    validateErrors("tags", newValue);
    setCurrentTags(newValue);
  };

  const handleCategoryChange = (newValue: any, actionMeta: any) => {
    if (newValue === null) {
      validateErrors("category", 0);
      setCategory({ id: 0, name: "" });
      return;
    }

    validateErrors("category", newValue.value);

    setCategory({ id: newValue.value, name: newValue.label });
  };

  const handleStatusChange = (newValue: any, actionMeta: any) => {
    setStatus(newValue.value);
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0]);
      setImgPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCourseLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category_id", category.id.toString());
    formData.append("price", price.toString());
    formData.append("summary_desc", summaryDesc);
    formData.append("content", content);
    formData.append("author_name", author);
    formData.append("status", status);
    if (img) {
      formData.append("img_url", img);
    }
    let tags = "";
    if (currentTags) {
      currentTags.forEach((tag) => {
        tags += tag.label + ",";
      });
    }
    tags = tags.slice(0, tags.length - 1);
    formData.append("tag", tags);

    fetch(`${API_URL}/course`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.admin_token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Error 404: Not Found");
          }
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((data) => {
        toastSuccess("Course create successfully");
        setCourseLoading(false);
        navigate(`/course`);
      })
      .catch((error) => {
        toastFailed("Failed to create course");
        setCourseLoading(false);
      });
  };
  return (
    <div className="container mt-5">
      <ToastComponent />
      <div className="centered">
        {courseLoading ? <LottieComponent animationData={loading} /> : []}
      </div>
      {/* Edit Form Title */}
      <div className={"row " + (courseLoading ? " opaque" : "")}>
        <div className="col-12 section-container">
          <h1 className="h3 mb-2 text-gray-800 section-title text-center">
            Create a new Course
          </h1>
        </div>
      </div>
      {/* Edit Form */}
      <CourseForm
        author={author}
        categories={categories}
        category={category}
        content={content}
        currentTags={currentTags}
        handleAuthorChange={handleAuthorChange}
        handleCategoryChange={handleCategoryChange}
        handleContentChange={handleContentChange}
        handleImgChange={handleImgChange}
        handlePriceChange={handlePriceChange}
        handleSummaryDescChange={handleSummaryDescChange}
        handleTagChange={handleTagChange}
        handleTitleChange={handleTitleChange}
        handleSubmit={handleSubmit}
        img={img}
        price={price}
        summaryDesc={summaryDesc}
        tags={tags}
        title={title}
        setAuthor={setAuthor}
        setCategory={setCategory}
        setContent={setContent}
        setCurrentTags={setCurrentTags}
        setImg={setImg}
        setPrice={setPrice}
        setSummaryDesc={setSummaryDesc}
        setTitle={setTitle}
        imgPreview={imgPreview}
        setImgPreview={setImgPreview}
        errors={errors}
        status={status}
        handleStatusChange={handleStatusChange}
        setStatus={setStatus}
      />
    </div>
  );
}
