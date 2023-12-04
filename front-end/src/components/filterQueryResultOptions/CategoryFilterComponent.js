import { useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const CategoryFilterComponent = ({ setCategoryFilterComponent }) => {
  const { categories } = useSelector((state) => state.category)
  const [selectedCategories, setSelectedCategories] = useState({})
  return (
    <>
      <span className="fw-bold">Category</span>
      <Form>
        {categories.map((category, idx) => {
          return (
            <Form.Check key={idx} type="checkbox" id={`check-api2-${idx}`}>
              <Form.Check.Input type="checkbox" isValid onChange={(e) => {
                  setCategoryFilterComponent((alreadyInCategory) => {
                    if(e.target.checked){
                      return { ...alreadyInCategory, [category.name]: e.target.checked }
                    }
                    else{
                      delete alreadyInCategory[category.name]
                      return {...alreadyInCategory}
                    }
                  })
               
              }}
              ></Form.Check.Input>
              <Form.Check.Label style={{ cursor: "pointer" }}>{category.name}</Form.Check.Label>
            </Form.Check>
          )
        })}
      </Form>
    </>
  )
}
export default CategoryFilterComponent;