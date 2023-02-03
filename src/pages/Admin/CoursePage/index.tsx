import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GenericButton from "../../../components/buttons/GenericButton";
import CourseFilterForm from "../../../components/forms/CourseFilterForm";
import GenericPagination from "../../../components/navigations/GenericPagination";
import CourseTable from "../../../components/tables/CourseTable";
import useDebounce from "../../../hooks/useDebounce";
import { IFilterRequest } from "../../../interfaces";
import { RootState } from "../../../store";
import { fetchCategories } from "../../../store/slices/course/category/categorySlice";
import {
  CourseDispatch,
  fetchCourses,
} from "../../../store/slices/course/courseSlice";
import { fetchTags } from "../../../store/slices/course/tag/tagSlice";
import { toastFailed, toastSuccess } from "../../../utils/util";
import "./styles.scss";

export default function CoursePage() {
  const API_URL_ADMIN = process.env.REACT_APP_API__URL_AUTH_ADMIN;
  const navigate = useNavigate();
  const [cookies] = useCookies(["admin_token"]);
  const { courses } = useSelector((state: RootState) => state.course);
  const { tags } = useSelector((state: RootState) => state.tag);
  const { categories } = useSelector((state: RootState) => state.category);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageTotal, setPageTotal] = useState<number>(1);
  const [currentTags, setCurrentTags] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [currentSortDir, setCurrentSortDir] = useState<string>("desc");

  const courseDispatch: CourseDispatch = useDispatch();
  const tagDispatch: CourseDispatch = useDispatch();
  const categoryDispatch: CourseDispatch = useDispatch();
  const debouncedSearch = useDebounce(currentSearch, 1000);

  useEffect(() => {
    tagDispatch(fetchTags());
  }, [tagDispatch]);

  useEffect(() => {
    categoryDispatch(fetchCategories());
  }, [categoryDispatch]);

  useEffect(() => {
    courseDispatch(
      fetchCourses({
        page: pageNumber,
        search: debouncedSearch,
        size: 10,
        sortBy: "created_at",
        sortDir: currentSortDir,
        last: "",
        tags: currentTags,
        category: currentCategory,
        status: "",
        access_token: "",
      })
    );
  }, [
    courseDispatch,
    pageNumber,
    currentSortDir,
    debouncedSearch,
    currentTags,
    currentCategory,
  ]);

  useEffect(() => {
    if (courses !== undefined) {
      setPageTotal(
        Math.ceil(
          courses?.pagination_response.total_item /
            courses?.pagination_response.limit
        )
      );
    }
  }, [courses]);
  const handleDeleteCourse = (slug: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
    } else {
      return;
    }
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.admin_token}`,
      },
    };

    fetch(API_URL_ADMIN + "/course/" + slug, requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Error 404: Not Found");
          }
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((res) => {
        courseDispatch(
          fetchCourses({
            page: 1,
            search: "",
            size: 10,
            sortBy: "created_at",
            sortDir: "asc",
            last: "",
            tags: "",
            category: "",
            status: "",
            access_token: "",
          })
        );
        toastSuccess("Course deleted");
      })
      .catch((error) => {
        toastFailed("Failed to delete course");
      });
  };

  const handleEditCourse = (slug: string) => {
    navigate("/course/" + slug);
  };

  const handleTagChange = (newValue: any, actionMeta: any) => {
    let tags: string;
    tags = "";
    for (let i = 0; i < newValue.length; i++) {
      if (newValue.length >= 2 && i === 1) {
        tags = tags + ",";
      }

      tags = tags + newValue[i].value;

      if (i > 0 && i !== newValue.length - 1) {
        tags = tags + ",";
      }
    }

    setCurrentTags(tags);
    setPageNumber(1);
  };

  const handleCategoryChange = (newValue: any, actionMeta: any) => {
    setPageNumber(1);
    if (newValue === null) {
      setCurrentCategory("");
      return;
    }

    setCurrentCategory(newValue.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(e.target.value);
    setPageNumber(1);
  };

  const handleSortDirChange = (newValue: any, actionMeta: any) => {
    if (newValue.value === "1") {
      setCurrentSortDir("asc");
    } else {
      setCurrentSortDir("desc");
    }
    setPageNumber(1);
  };
  return (
    <div className="container section-container">
      <div className="course-btn">
        <GenericButton
          onClick={() => {
            navigate("/course/create");
          }}
          label="Create a New Course"
        />
      </div>
      <div>
        <CourseFilterForm
          tags={tags}
          categories={categories}
          handleTagChange={handleTagChange}
          handleCategoryChange={handleCategoryChange}
          handleSearchChange={handleSearchChange}
          handleSortDirChange={handleSortDirChange}
        />
      </div>
      <CourseTable
        handleDeleteCourse={handleDeleteCourse}
        handleEditCourse={handleEditCourse}
        courses={courses?.data}
      />
      <GenericPagination
        pageNumber={pageNumber}
        pageTotal={pageTotal}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
