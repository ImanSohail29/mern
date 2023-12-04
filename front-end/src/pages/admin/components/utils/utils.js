import axios from "axios"

export const uploadImagesApiRequest = async (images, productId) => {
    const formData = new FormData()
    // images.map((image)=>{
    //     formData.append("images",image)
    // })
    Array.from(images).forEach((image) => {
        formData.append("images", image)
    })
    console.log("formData:" + formData)
    const { data } = await axios.post("/api/products/admin/upload?productId=" + productId, formData)
    return data
}
export const uploadImagesCloudinaryApiRequest = (images, productId) => {
    const url = "https://api.cloudinary.com/v1_1/dyqklwu1n/image/upload"
    const formData = new FormData()
    console.log("formData:" + images)
    Array.from(images).forEach((image) => {
        formData.append("file", image)
        formData.append("upload_preset", "q7axspk2")
        fetch(url, {
            method: "POST",
            body: formData,
        }).then(response => { return response.json() })
            .then(data => {
                console.log("In DB:" + data.url)
                axios.post("/api/products/admin/upload?cloudinary=true&productId=" + productId, data)
            })
    })
}