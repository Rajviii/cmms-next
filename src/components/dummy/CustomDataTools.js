'use client';

import * as React from 'react';
import { Filter, Operators, TextFilter, NumericFilter, BooleanFilter, Pager } from '@progress/kendo-react-data-tools';
import { filterBy } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

const initialFilter = {
    logic: 'and',
    filters: [{
        field: 'UnitPrice',
        operator: 'gt',
        value: 20
    }, {
        field: 'UnitPrice',
        operator: 'lt',
        value: 50
    }, {
        field: 'Discontinued',
        operator: 'eq',
        value: false
    }, {
        logic: 'or',
        filters: [{
            field: 'ProductName',
            operator: 'contains',
            value: 'organic'
        }, {
            field: 'ProductName',
            operator: 'contains',
            value: 'cranberry'
        }]
    }]
};
const products = [
    {
  ProductID: 1,
  ProductName: 'Chai',
  SupplierID: 1,
  CategoryID: 1,
  QuantityPerUnit: '10 boxes x 20 bags',
  UnitPrice: 18.0,
  UnitsInStock: 39,
  UnitsOnOrder: 0,
  ReorderLevel: 10,
  Discontinued: false,
  Category: {
    CategoryID: 1,
    CategoryName: 'Beverages',
    Description: 'Soft drinks, coffees, teas, beers, and ales'
  }
}, {
  ProductID: 2,
  ProductName: 'Chang',
  SupplierID: 1,
  CategoryID: 1,
  QuantityPerUnit: '24 - 12 oz bottles',
  UnitPrice: 19.0,
  UnitsInStock: 17,
  UnitsOnOrder: 40,
  ReorderLevel: 25,
  Discontinued: false,
  Category: {
    CategoryID: 1,
    CategoryName: 'Beverages',
    Description: 'Soft drinks, coffees, teas, beers, and ales'
  }
}
]
const CustomDataTools = () => {
    const [filter, setFilter] = React.useState(initialFilter);
    const [skip, setSkip] = React.useState(0);
    const [take, setTake] = React.useState(5);
    const handleFilterChange = event => {
        setFilter(event.filter);
    };
    const handlePageChange = event => {
        setSkip(event.skip);
        setTake(event.take);
    };
    let filterData = filterBy(products, filter);
    return <React.Fragment>
        <Filter value={filter} onChange={handleFilterChange} fields={[{
            name: 'ProductName',
            label: 'Name',
            filter: TextFilter,
            operators: Operators.text
        }, {
            name: 'UnitPrice',
            label: 'Price',
            filter: NumericFilter,
            operators: Operators.numeric
        }, {
            name: 'Discontinued',
            label: 'Discontinued',
            filter: BooleanFilter,
            operators: Operators.boolean
        }]} />
        <hr />
        <Grid style={{
            maxHeight: '400px'
        }} data={filterData.slice(skip, skip + take)}>
            <GridColumn field="ProductName" title="Name" width="300px" />
            <GridColumn field="UnitPrice" title="Price" />
            <GridColumn field="Discontinued" title="Discontinued" />
        </Grid>
        <hr />
        <Pager skip={skip} take={take} type="input" previousNext={true} total={filterData.length} onPageChange={handlePageChange} />
    </React.Fragment>;
};
export default CustomDataTools;