import { Container, Row } from "react-bootstrap";
import CategoryCardComponent from "../../components/CategoryCardComponent";
import ProductCarouselComponent from "../../components/ProductCarouselComponent";
import { useEffect, useState } from "react";

const HomePageComponent = ({ categories,getBestSellers }) => {
    const [mainCategories, setMainCategories] = useState([])
    const [bestSellers,setBestSellers]=useState([])
    useEffect(() => {
        getBestSellers()
        .then((data)=>{
            console.log("bestSellers:"+data)
            setBestSellers(data)
        })
        .catch((er)=>console.log(er.response.data.message?er.response.data.message:er.response.data))
setMainCategories(()=>categories.filter((category)=>!category.name.includes("/")))
    }, [categories])
    return (
        <>
            <ProductCarouselComponent bestSellers={bestSellers}></ProductCarouselComponent>
            <Container>
                <Row xs={1} md={2} className="g-4 mt-5">

                    {
                        mainCategories.map((category, idx) => <CategoryCardComponent key={idx} category={category} idx={idx}></CategoryCardComponent>)
                    }
                </Row>
            </Container>
        </>

    )
};
export default HomePageComponent;