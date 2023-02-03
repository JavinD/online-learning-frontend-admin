import { ICourse } from "../../../interfaces";
import { toDate, toRupiah } from "../../../utils/util";
import CourseCategory from "../../course/Category";
import CourseStatus from "../../course/Status";
import CourseTag from "../../course/Tag";
import TableItem from "../TableItem";
import "./styles.scss";

type Props = {
  courses: ICourse[] | undefined;
  handleDeleteCourse: (id: string) => void;
  handleEditCourse: (id: string) => void;
};

export default function index({
  courses,
  handleDeleteCourse,
  handleEditCourse,
}: Props) {
  const chooseActiveClass = (status: string): string => {
    switch (status) {
      case "active":
        return "status-active";
      case "inactive":
        return "status-inactive";
      default:
        return "";
    }
  };

  return (
    <div>
      {/* Invoices Table */}
      <div className="row table-container">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Course ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Tags</th>
                  <th scope="col">Status</th>
                  <th scope="col">Price</th>
                  <th scope="col">Created Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {courses && courses.length > 0 ? (
                  courses.map((course, index) => {
                    return (
                      <tr key={course.slug}>
                        <th scope="row">{index + 1}</th>
                        <TableItem child={course.id} />
                        <TableItem child={course.title} />
                        <TableItem
                          child={
                            <CourseCategory label={course.category.name} />
                          }
                        />
                        <TableItem
                          child={
                            course.tag &&
                            course.tag.map((tag) => {
                              return (
                                <CourseTag key={tag.name} label={tag.name} />
                              );
                            })
                          }
                        />
                        <TableItem
                          child={
                            <CourseStatus
                              label={course.status}
                              className={chooseActiveClass(course.status)}
                            />
                          }
                        />
                        <TableItem child={toRupiah(course.price)} />
                        <TableItem child={toDate(course.created_at)} />
                        <TableItem
                          child={
                            <div className="d-flex">
                              <button
                                className="btn btn-primary me-2"
                                onClick={() => handleEditCourse(course.slug)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteCourse(course.slug)}
                              >
                                Delete
                              </button>
                            </div>
                          }
                        />
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center">
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
