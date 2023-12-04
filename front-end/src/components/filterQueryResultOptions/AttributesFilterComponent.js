import { Form } from "react-bootstrap"

const AttributesFilterComponent = ({ attrsFilter, setAttrsFromFilter }) => {
    return (
        <>
            {attrsFilter && attrsFilter.length > 0 && attrsFilter.map((attrs, idx) => {
                return (
                    <Form key={idx} className="mb-3">
                        <Form.Label>
                            <b>{attrs.key}</b>
                        </Form.Label>

                        {attrs.value.map((valueForKey, idx2) => {
                            return (
                                <Form.Check key={idx2} type="checkbox" label={valueForKey} onChange={e => {
                                    setAttrsFromFilter(alreadyInAttrsFromFilter => {
                                      if (alreadyInAttrsFromFilter.length === 0) {
                                        {console.log("attrsFromFilter:1")}
                                        return [{ key: attrs.key, values: [valueForKey] }];
                                      }
                    
                                      let index = alreadyInAttrsFromFilter.findIndex((item) => item.key === attrs.key);
                                      if (index === -1) {
                                        {console.log("attrsFromFilter:2")}
                                        // if not found (if clicked key is not inside alreadyInAttrsFromFilter)
                                        return [...alreadyInAttrsFromFilter, { key: attrs.key, values: [valueForKey] }];
                                      }
                    
                                      // if clicked key is inside alreadyInAttrsFromFilter and checked
                                      if (e.target.checked) {
                                        {console.log("attrsFromFilter:3")}
                                        alreadyInAttrsFromFilter[index].values.push(valueForKey);
                                        let unique = [...new Set(alreadyInAttrsFromFilter[index].values)]; //because it iterates all checked values therefore stores checked value twice
                                        alreadyInAttrsFromFilter[index].values = unique;
                                        return [...alreadyInAttrsFromFilter];
                                      }
                    
                                      // if clicked key is inside alreadyInAttrsFromFilter and unchecked
                                      let valuesWithoutUnChecked = alreadyInAttrsFromFilter[index].values.filter((val) => val !== valueForKey);
                                      alreadyInAttrsFromFilter[index].values = valuesWithoutUnChecked;
                                      if (valuesWithoutUnChecked.length > 0) {
                                        {console.log("attrsFromFilter:4")}
                                        return [...alreadyInAttrsFromFilter];
                                      } else {
                                        let filtersWithoutOneKey = alreadyInAttrsFromFilter.filter((item) => item.key !== attrs.key);
                                        {console.log("attrsFromFilter:filtersWithoutOneKey:  "+filtersWithoutOneKey)}
                                        {console.log("attrsFromFilter:5")}
                                        return [...filtersWithoutOneKey];
                                      }
                    
                                    }
                                    )
                                }}></Form.Check>)
                        })}
                    </Form>
                )
            })}

        </>
    )
}
export default AttributesFilterComponent;