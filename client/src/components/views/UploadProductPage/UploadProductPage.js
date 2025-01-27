import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import FileUplaod from "../../utils/FileUpload";
import Axios from "axios";

const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const continentChangeHandler = (event) => {
    setContinent(event.currentTarget.value);
  };

  const updateImages = (newImage) => {
    setImages(newImage);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Title || !Description || !Price || !Continent || !Images) {
      return alert("모든 값을 넣어주세요.");
    }

    // 서버에 채운 값을 리퀘스트로 보냄

    const body = {
      // 로그인 된 사람의 ID

      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continent: Continent,
    };

    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드에 성공했습니다. ✅");
        props.history.push("/");
      } else {
        alert("상품 업로드에 실패했습니다. ❌");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>상품 업로드</h2>
      </div>

      <Form>
        {/* DropZone */}

        <FileUplaod refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea
          onChange={descriptionChangeHandler}
          value={Description}
        ></TextArea>
        <br />
        <br />
        <label>가격</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="submit" onClick={submitHandler}>
          확인
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
