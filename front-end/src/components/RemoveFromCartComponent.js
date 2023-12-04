import { Button } from "react-bootstrap"

const RemoveFromCartComponent=({productId,orderCreated,quantity,price,removeFromCartHandler})=>{
    return (
        <Button type="button" variant="secondary" disabled={orderCreated} onClick={removeFromCartHandler?() => removeFromCartHandler(productId,quantity,price):undefined}>
                            <i className="bi bi-trash"></i>
                        </Button>
    )
}
export default RemoveFromCartComponent