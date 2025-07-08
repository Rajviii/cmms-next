'use client';

import * as React from 'react';

import {
    AutoComplete,
    ComboBox,
    MultiColumnComboBox,
    DropDownList,
    MultiSelect,
    DropDownTree
} from '@progress/kendo-react-dropdowns';


const CustomDropdowns = () => {
    const employees = [{
        id: 1,
        name: 'Daryl Sweeney',
        reportsTo: null,
        phone: '(555) 924-9726',
        extension: 8253,
        hireDate: new Date('2012-02-07T20:00:00.000Z'),
        fullTime: true,
        position: 'CEO',
        timeInPosition: 2
    }, {
        id: 2,
        name: 'Guy Wooten',
        reportsTo: 1,
        phone: '(438) 738-4935',
        extension: 1155,
        hireDate: new Date('2010-03-03T20:00:00.000Z'),
        fullTime: true,
        position: 'Chief Technical Officer',
        timeInPosition: 1
    }]

    const sports = [
        'Baseball',
        'Basketball',
        'Cricket',
        'Field Hockey',
        'Football',
        'Table Tennis',
        'Tennis',
        'Volleyball'
    ];

    const columns = [
        { field: 'id', header: 'ID', width: '100px' },
        { field: 'name', header: 'Name', width: '300px' },
        { field: 'position', header: 'Position', width: '300px' }
    ];
    const data = employees;

    return (
        <div className="example-wrapper" style={{ minHeight: '400px' }}>
            {/* Autocomplete is not paid */}
            <div className="col-xs-12 col-sm-7 example-col">
                <p>AutoComplete</p>
                <AutoComplete style={{ width: '300px' }} data={sports} placeholder="Your favorite sport" />
            </div>
            {/* DropDownList is not paid */}
            <div className="col-xs-12 col-sm-7 example-col">
                <p>DropDownList</p>
                <DropDownList style={{ width: '300px' }} data={sports} defaultValue="Basketball" />
            </div>
            {/* MultiSelect is not paid */}
            <div className="col-xs-12 col-sm-7 example-col">
                <p>MultiSelect</p>
                <MultiSelect style={{ width: '300px' }} data={sports} defaultValue={['Basketball', 'Cricket']} />
            </div>


            {/* Paid */}
            {/* <div className="col-xs-12 col-sm-7 example-col">
                <p>ComboBox</p>
                <ComboBox style={{ width: '300px' }} data={sports} defaultValue="Basketball" />
            </div> */}

            {/* <div className="col-xs-12 col-sm-7 example-col">
                <p>MultiColumnComboBox</p>
                <MultiColumnComboBox style={{ width: '300px' }} data={data} columns={columns} textField={'name'} />
            </div> */}
            
            
            {/* <div className="col-xs-12 col-sm-7 example-col">
                <p>DropDownTree</p>
                <DropDownTree
                    style={{ width: '300px' }}
                    data={[
                        {
                            text: 'Furniture',
                            id: 1,
                            expanded: true,
                            items: [
                                { text: 'Tables & Chairs', id: 2 },
                                { text: 'Sofas', id: 3 },
                                { text: 'Occasional Furniture', id: 4 }
                            ]
                        }
                    ]}
                    defaultValue={{ text: 'Sofas', id: 3 }}
                    textField="text"
                    dataItemKey="id"
                />
            </div> */}
        </div>
    );
};

export default CustomDropdowns;
