import React from 'react';
import MySelect from "./MySelect.jsx";
import MyInput from "./MyInput.jsx";
import Reset from "./Reset.jsx";
const Filter = ({filter, setFilter, children}) => {
    return (
        <div className="filter">
            {children}
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                label="Сортировка по"
                defaultValue="нет"
                options={[
                    {value: 'year', name: 'год'},
                    {value: 'rating', name: 'рейтинг'},
                    {value: 'name', name: 'название'},
                ]}
            />
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Поиск по названию..."
            >
                <Reset
                    className={'reset'}
                    onClick={() => setFilter({...filter, query: ''})}
                />
            </MyInput>
        </div>
    );
};

export default Filter;