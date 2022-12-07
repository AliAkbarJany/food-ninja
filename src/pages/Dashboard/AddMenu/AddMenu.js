import React, { useState } from 'react';
import { Scissors } from 'styled-icons/bootstrap';
import { Dollar } from 'styled-icons/open-iconic';
import AsyncCreatableSelect from "react-select/async-creatable";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { Box, Col, Container, FileInput, Form, FormBody, FormContainer, InputGroup, Row } from './AddMenu.elements';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { customAlphabet } from 'nanoid';

import FormButtonGroup from '../../../shared/FormButtonGroup/FormButtonGroup'
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import axios from 'axios';

const ingredientOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "cheese", label: "Cheese" },
    { value: "pepperoni", label: "Pepperoni" },
    { value: "sausage", label: "Sausage" },
    { value: "bacon", label: "Bacon" },
    { value: "egg", label: "Egg" },
    { value: "onions", label: "Onions" },
    { value: "bbq", label: "BBQ Sauce" },
];

const AddMenu = () => {
    const [user] = useAuthState(auth);
    const nanoid = customAlphabet("1234567890", 10);
    const imageStorageKey = '2d59c7729d24b4215adc2da4eeab7ea0'

    const [inputValue, setValue] = useState({
        sku: "sku_" + nanoid(10),
        name: "",
        price: 0,
        offer: 0,
        desc: "",
    });

    // handle input change event
    const handleInputChange = (e) => {
        setValue((oldValues) => ({
            ...oldValues,
            [e.target.name]:
                e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
        }));
    };

    const [tags, setTags] = useState([]);

    const [file, setFile] = useState([]);
    const handleOnFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    // get all Restaurant owner/vendor Information...
    const {
        data: restaurantInfo,
        isLoading,
        refetch,
    } = useQuery(["Restaurant", user.email], () =>
        fetch(`http://localhost:5000/restaurant?restaurantId=${user.email}`).then(
            (res) => res.json()
        )
    );

    const [categories, setCategories] = useState(null)
    const handleChange = (value) => {
        setCategories(value);
    };

    const getData = async () => {
        let res = await axios.get("http://localhost:5000/category");
        console.log('inside Axios',res)
        return res.data;
    };

    function capitalize(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    const loadOptions = (inputValue) => {
        return getData().then((res) => {
            return res
                .filter((r) =>
                    r.label.toLowerCase().startsWith(inputValue.toLowerCase())
                )
                .map((t) => ({ value: t._id, label: capitalize(t.label) }));
        });
    };


    const onSubmit = (event) => {
        event.preventDefault();
        console.log('inputValues', inputValue)
        console.log('Tags', tags)

        const formData = new FormData();
        formData.append('image', file)
        const url = `https://api.imgbb.com/1/upload?&key=${imageStorageKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log('imgbb', result)
                if (result.success) {
                    const image = result.data.url
                    const menu = {
                        ...inputValue,
                        image,
                        category: { ...categories },
                        ingredients: tags,
                        currency: "USD",
                        restaurantInfo,
                    }
                    console.log('menu', menu)

                    if (menu?.category?.__isNew__) {
                        const categoryInfo = {
                            label: menu.category.label,
                            value: menu.category.value,

                        };
                        console.log('category', categoryInfo)

                        fetch(`http://localhost:5000/category`, {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                            },
                            body: JSON.stringify(categoryInfo),
                        })
                            .then((res) => res.json())
                            .then((addedCategory) => {
                                console.log('added category in Db', addedCategory)
                                if (addedCategory.success) {
                                    toast.success(`New Category Added Successfully`);
                                }
                            });

                    }
                    // send to dataBase
                    fetch(`http://localhost:5000/meal`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(menu),
                    })
                        .then((res) => res.json())
                        .then((inserted) => {
                            console.log('menu inseted/added in Db', inserted)
                            if (inserted.success) {
                                toast.success(`Item Added Successfully`);
                            } else {
                                toast.error(`Failed to add the product`);
                            }
                        })
                        .catch((error) => {
                            toast.error(`Error adding product`);
                            console.log(error);
                        });
                }
            })
    }
    return (
        <Form onSubmit={onSubmit}>
            <FormContainer>
                <FormBody>
                    <Row>
                        <Col>
                            <div>
                                <label htmlFor="name">Item Name</label>
                                <input
                                    // required
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={inputValue.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <label htmlFor="sku">ID</label>
                                <input
                                    id="sku"
                                    name="sku"
                                    type="text"
                                    value={inputValue.sku}
                                    placeholder={inputValue.sku}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Box>
                            <div>
                                <label>Category</label>
                                <AsyncCreatableSelect
                                    cacheOptions
                                    defaultOptions
                                    isSearchable
                                    value={categories}
                                    loadOptions={loadOptions}
                                    // onInputChange={handleInputChange}
                                    onChange={handleChange}
                                // styles={customStyles}
                                // theme={customTheme}
                                />
                            </div>
                        </Box>
                        <Box>
                            <div>
                                <label>Add On</label>
                                <CreatableSelect
                                    required
                                    placeholder={`Select Ingredients...`}
                                    components={makeAnimated()}
                                    isClearable
                                    options={ingredientOptions}
                                    onChange={setTags}
                                    // styles={customStyles}
                                    // theme={customTheme}
                                    isMulti
                                />
                            </div>
                        </Box>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <label htmlFor="price">Price</label>
                                <InputGroup>
                                    <div>
                                        <Dollar width={20} />
                                    </div>
                                    <input
                                        // required
                                        id="price"
                                        name="price"
                                        type="number"
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <label htmlFor="offer">Discount</label>
                                <InputGroup>
                                    <div>
                                        <Scissors width={20} />
                                    </div>
                                    <input
                                        id="offer"
                                        name="offer"
                                        type="number"
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Container>
                            <div>
                                <label htmlFor="desc">Description</label>
                                <textarea
                                    name="desc"
                                    id="desc"
                                    type="text"
                                    value={inputValue.desc}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <FileInput>
                                <h4 className="box-title mt-10">Uploaded Image</h4>
                                <div>
                                    <input
                                        // required
                                        name="image"
                                        id="image"
                                        type="file"
                                        onChange={handleOnFileChange}
                                    />
                                </div>
                            </FileInput>
                        </Container>
                    </Row>
                </FormBody>
            </FormContainer>

            {/* <input type="submit" /> */}
            <FormButtonGroup
                btn1="Add / Submit"
                btn2="Cancel"
                btnType1="submit"
                btnType2="button"
            />
        </Form>
    );
};

export default AddMenu;