import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { ICategory, ICourse, ICourseDetail, ITag } from "../../../interfaces";
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
import GenericButton from "../../buttons/GenericButton";
import GenericCreatableSelect from "../../inputs/GenericCreatableSelect";
import GenericInput from "../../inputs/GenericInput";
import GenericSelect from "../../inputs/GenericSelect";
import GenericTextArea from "../../inputs/GenericTextArea";
import ToastComponent from "../../toast";

type Props = {
  course?: ICourseDetail | undefined;
  tags: ITag[] | undefined;
  categories: ICategory[] | undefined;
  category: ICategory;
  setCategory: React.Dispatch<React.SetStateAction<ICategory>>;
  handleCategoryChange: (newValue: any, actionMeta: any) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTags:
    | {
        value: string;
        label: string;
      }[]
    | undefined;
  setCurrentTags: React.Dispatch<
    React.SetStateAction<
      | {
          value: string;
          label: string;
        }[]
      | undefined
    >
  >;
  handleTagChange: (newValue: any, actionMeta: any) => void;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  summaryDesc: string;
  setSummaryDesc: React.Dispatch<React.SetStateAction<string>>;
  handleSummaryDescChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  img: File | undefined;
  setImg: React.Dispatch<React.SetStateAction<File | undefined>>;
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  author: string;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  handleAuthorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  imgPreview: string;
  setImgPreview: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  handleStatusChange: (newValue: any, actionMeta: any) => void;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  errors: {
    title: string;
    category: string;
    tags: string;
    price: string;
    summaryDesc: string;
    content: string;
    author: string;
    img: string;
  };
};

export default function CourseForm({
  course,
  status,
  setStatus,
  handleStatusChange,
  category,
  content,
  currentTags,
  handleCategoryChange,
  handleContentChange,
  handlePriceChange,
  handleSummaryDescChange,
  handleTagChange,
  handleTitleChange,
  handleSubmit,
  img,
  price,
  setCategory,
  setContent,
  setCurrentTags,
  setImg,
  setPrice,
  setSummaryDesc,
  setTitle,
  tags,
  title,
  summaryDesc,
  categories,
  author,
  handleAuthorChange,
  handleImgChange,
  setAuthor,
  imgPreview,
  setImgPreview,
  errors,
}: Props) {
  const courseStatusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="container mt-2">
      <ToastComponent />
      <section className="h-100 h-custom cart-container">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-8 form-container">
              <form onSubmit={handleSubmit}>
                <GenericInput
                  error={errors.title}
                  formText=""
                  label="Course Title"
                  name="title"
                  onChange={handleTitleChange}
                  required={true}
                  type="text"
                  value={title}
                  className="mb-2"
                />
                <p className="mb-2">Category</p>
                <GenericSelect
                  error={errors.category}
                  handleChange={handleCategoryChange}
                  placeholder="Select Category"
                  isMulti={false}
                  options={categories}
                  defaultValues={{
                    value: category.id.toString(),
                    label: category.name,
                  }}
                />
                <p className="mb-2">Tags</p>
                <GenericCreatableSelect
                  error={errors.tags}
                  handleChange={handleTagChange}
                  placeholder="Select Tags"
                  defaultOptions={tags?.map((tag) => {
                    return { value: tag.id.toString(), label: tag.name };
                  }, [])}
                  isMulti={true}
                  defaultValues={currentTags}
                />
                <GenericInput
                  error={errors.author}
                  formText=""
                  label="Course Author Name"
                  name="author"
                  onChange={handleAuthorChange}
                  required={true}
                  type="text"
                  value={author}
                  className="mb-2"
                />
                <GenericInput
                  error={errors.price}
                  formText=""
                  label="Course Price"
                  name="price"
                  onChange={handlePriceChange}
                  required={true}
                  type="number"
                  value={price}
                  className="mb-2"
                />
                <GenericInput
                  error={errors.summaryDesc}
                  formText=""
                  label="Course Summary"
                  name="summary_desc"
                  onChange={handleSummaryDescChange}
                  required={true}
                  type="text"
                  value={summaryDesc}
                  className="mb-2"
                />
                <GenericTextArea
                  error={errors.content}
                  formText=""
                  label="Course Content"
                  name="content"
                  onChange={handleContentChange}
                  required={true}
                  value={content}
                />
                <p className="mb-2">Status</p>
                <GenericSelect
                  handleChange={handleStatusChange}
                  placeholder="Select Status"
                  isMulti={false}
                  defaultOptions={courseStatusOptions}
                  defaultValues={{
                    value: status,
                    label: status === "active" ? "Active" : "Inactive",
                  }}
                />
                <GenericInput
                  error={errors.img}
                  formText=""
                  label="Course Image"
                  name="img_url"
                  onChange={handleImgChange}
                  required={false}
                  type="file"
                  className="mb-2"
                />
                {imgPreview !== "" && <img src={imgPreview} alt="preview" />}
                <GenericButton label="Save" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
