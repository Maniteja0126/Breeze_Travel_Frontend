import axios from "axios";
import { useEffect, useState } from "react";
import { useCategory, useFilter } from "../../Context";
import "./Categories.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [numberOfCategoryToShow, setNumberOfCategoryToShow] = useState(0)
  const { hotelCategory, setHotelCategory } = useCategory();

  const { filterDispatch } = useFilter();

  const handleFilterClick = () => {
    filterDispatch({
      type: "SHOW_FILTER_MODAL",
    });
  };
  const handleCategoryClick = (category) => {
    setHotelCategory(category);
  };
  const handleShowMoreRightClick = () => {
    setNumberOfCategoryToShow(prev => prev + 10)
  }
  const handleShowMoreLeftClick = () => {
    setNumberOfCategoryToShow((prev) => prev - 10)
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://breeze-travel-backend.onrender.com/api/category"
        );
        const categoriesToShow = data.slice(
          numberOfCategoryToShow + 10 > data.length ? data.length - 10 : numberOfCategoryToShow,
          numberOfCategoryToShow > data.length ? data.length : numberOfCategoryToShow + 10)
        setCategories(categoriesToShow);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [numberOfCategoryToShow]);



  return (
    <section className="categories d-flex gap">
      {
        numberOfCategoryToShow >= 10 && (<button
          className="button btn-category btn-left fixed cursor-pointer"
          onClick={handleShowMoreLeftClick}>
          <span className="material-icons-outlined">
            chevron_left
          </span>
        </button>)
      }

      {
        categories && categories.map(({ _id, category }) => <span key={_id} className={`${category === hotelCategory ? "category-color" : ""} item`} onClick={() => handleCategoryClick(category)} >{category}</span>)
      }
      {
        numberOfCategoryToShow < categories.length && (<button
          className="button btn-category btn-right fixed cursor-pointer"
          onClick={handleShowMoreRightClick}>
          <span className="material-icons-outlined">
            chevron_right
          </span>
        </button>)
      }

      <div>
        <button
          className="button btn-filter d-flex align-center gap-small cursor-pointer"
          onClick={handleFilterClick}
        >
          <span className="material-icons-outlined">filter_alt</span>
          <span>Filter</span>
        </button>
      </div>

    </section>


  );
};