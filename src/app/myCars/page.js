"use client";
import { useState, useEffect } from "react";
import { Button, Input, Modal, Popconfirm, Table, Select } from "antd";
import { IoIosRefresh } from "react-icons/io";
import { Image } from "@nextui-org/react";
import { FaEdit, FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Container from "@/Components/Container/Container";
import { Space } from "@/Components/Space/Space";
import { CARS_URL } from "@/apiconfig/endpoint";

const CarDashboard = () => {
  const [carList, setCarList] = useState([]);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [newCarData, setNewCarData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
const { Option } = Select;
  const showModal = (id) => {
    setSelectedCarId(id);
    const selectedCar = carList.find((car) => car.id === id);
    setEditFormData(selectedCar);
    setSelectedImage(selectedCar.image1);
  };

  const handleCancel = () => {
    setSelectedCarId(null);
    setOpen(false);
  };

const handleInputChange = (name, value, isEditForm = false) => {
  let parsedValue;

  switch (name) {
    case "priceDay":
    case "priceWeek":
    case "priceMonth":
    case "mileage":
    case "tank":
      parsedValue = parseFloat(value);
      break;
    case "year":
    case "seats":
    case "numberDoors":
      parsedValue = parseInt(value, 10);
      break;
    case "category":
    case "condition":
      parsedValue = value; // For enums, use the entire value
      break;
    default:
      parsedValue = value;
  }

  const updateFunction = isEditForm ? setEditFormData : setNewCarData;

  updateFunction((prevData) => ({
    ...prevData,
    [name]: parsedValue,
  }));
};


  const handleDeleteClick = async (id) => {
    try {
      let url = `${CARS_URL}/${id}`;
      await fetch(url, {
        method: "DELETE",
      });
      setRefresh((prevRefresh) => prevRefresh + 1);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let res = await fetch(`${CARS_URL}?query=${search}`);
        let jsonData = await res.json();

        // Check if 'cars' property exists, and extract the array
        const cars = jsonData.success ? jsonData.cars : jsonData;

        // Sort cars by id in ascending order
        const sortedCars = cars.sort((a, b) => a.id - b.id);

        setCarList(sortedCars);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, refresh]);

  const handleEditClick = async () => {
    try {
      let url = `${CARS_URL}/${selectedCarId}`;
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });
      setRefresh((prevRefresh) => prevRefresh + 1);
    } catch (error) {
      console.error("Error updating data:", error);
    }
    setSelectedCarId(null);
  };

  const handleAddClick = async () => {
    try {
      let url = `${CARS_URL}`;
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCarData),
      });
      setRefresh((prevRefresh) => prevRefresh + 1);
    } catch (error) {
      console.error("Error adding data:", error);
    }
    // Reset newCarData after adding a new car
    setNewCarData({});
    setOpen(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Image",
      dataIndex: "image1",
      key: "image1",
      render: (text, record) => (
        <Image
          src={text}
          alt={record.name}
          style={{ borderRadius: "50%", height: "70px", width: "70px" }}
          width={70}
          height={70}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Price (Day)",
      dataIndex: "priceDay",
      key: "priceDay",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space width={20} />
          <Button onClick={() => showModal(record.id)} size="large">
            <FaEdit />
          </Button>
          <Popconfirm
            title="Delete item?"
            description="Are you sure you want to delete this item?"
            okText="Yes"
            cancelText="No"
            okType="danger"
            onConfirm={() => handleDeleteClick(record.id)}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button type="primary" danger size="large">
              <MdDelete />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Container width={1300}>
      <Space height="20px" />
      <div className="flex justify-between">
        <Input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Space width="150px" />
        <Button
          onClick={() => setOpen(true)}
          size="large"
          style={{ color: "white" }}
        >
          Add +
        </Button>
        <Button
          className="default"
          onClick={() => setRefresh((prevRefresh) => prevRefresh + 1)}
          size="large"
          style={{ color: "white" }}
        >
          <IoIosRefresh />
        </Button>
      </div>
      <Space height="20px" />
      <Table columns={columns} dataSource={carList} loading={loading} />
      {/* Car Details Modal */}
      <Modal
        title="Car Details"
        open={selectedCarId}
        onOk={handleEditClick}
        onCancel={handleCancel}
      >
        {selectedImage && (
          <Image src={selectedImage} alt="Image" width={350} height={350} />
        )}
        <p>Name</p>
        <Input
          name="name"
          value={editFormData.name}
          onChange={(e) => handleInputChange("name", e.target.value, true)}
        />
        <p>Price (Day)</p>
        <Input
          name="priceDay"
          value={editFormData.priceDay}
          onChange={(e) => handleInputChange("priceDay", e.target.value, true)}
        />
        <p>Image</p>
        <Input
          name="image1"
          value={editFormData.image1}
          onChange={(e) => handleInputChange("image1", e.target.value, true)}
        />
        <p>Category</p>
        <Input
          name="category"
          value={editFormData.categoryId}
          onChange={(e) =>
            handleInputChange("categoryId", e.target.value, true)
          }
        />
      </Modal>
      {/* Add Car Modal */}
      <Modal
        title="Add Car"
        open={open}
        onOk={handleAddClick}
        onCancel={handleCancel}
        okType="default"
      >
        <p>Name</p>
        <Input
          name="name"
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <p>Brand ID</p>
        <Input
          name="brandId"
          onChange={(e) => handleInputChange("brandId", e.target.value)}
        />
        <p>Store ID</p>
        <Input
          name="storeId"
          onChange={(e) => handleInputChange("storeId", e.target.value)}
        />
        <p>Model</p>
        <Input
          name="model"
          onChange={(e) => handleInputChange("model", e.target.value)}
        />
        <p>Year</p>
        <Input
          name="year"
          onChange={(e) => handleInputChange("year", e.target.value)}
        />
        <p>Seats</p>
        <Input
          name="seats"
          onChange={(e) => handleInputChange("seats", e.target.value)}
        />
        <p>Tank</p>
        <Input
          name="tank"
          onChange={(e) => handleInputChange("tank", e.target.value)}
        />
        <p>Fuel Type</p>
        <Input
          name="fuel_type"
          onChange={(e) => handleInputChange("fuel_type", e.target.value)}
        />
        <p>Mileage</p>
        <Input
          name="mileage"
          onChange={(e) => handleInputChange("mileage", e.target.value)}
        />
        <p>Available</p>
        <Input
          name="available"
          onChange={(e) => handleInputChange("available", e.target.value)}
        />
        <p>Plate Number</p>
        <Input
          name="plateNumber"
          onChange={(e) => handleInputChange("plateNumber", e.target.value)}
        />
        <p>Image 1</p>
        <Input
          name="image1"
          onChange={(e) => handleInputChange("image1", e.target.value)}
        />
        <p>Image 2</p>
        <Input
          name="image2"
          onChange={(e) => handleInputChange("image2", e.target.value)}
        />
        <p>Image 3</p>
        <Input
          name="image3"
          onChange={(e) => handleInputChange("image3", e.target.value)}
        />
        <p>Image 4</p>
        <Input
          name="image4"
          onChange={(e) => handleInputChange("image4", e.target.value)}
        />
        <p>Price (Day)</p>
        <Input
          name="priceDay"
          onChange={(e) => handleInputChange("priceDay", e.target.value)}
        />
        <p>Price (Week)</p>
        <Input
          name="priceWeek"
          onChange={(e) => handleInputChange("priceWeek", e.target.value)}
        />
        <p>Price (Month)</p>
        <Input
          name="priceMonth"
          onChange={(e) => handleInputChange("priceMonth", e.target.value)}
        />
        <p>Number of Doors</p>
        <Input
          name="numberDoors"
          onChange={(e) => handleInputChange("numberDoors", e.target.value)}
        />
        <p>Category</p>
        <Select
          name="category"
          onChange={(value) => handleInputChange("category", value)}
          style={{ width: 200 }}
          value={newCarData.category} // Make sure to pass the correct value from your state
        >
          <Option value="SUV">SUV</Option>
          <Option value="SEDAN">SEDAN</Option>
          <Option value="SPORT">SPORT</Option>
          <Option value="PICKUP">PICKUP</Option>
          <Option value="COUPE">COUPE</Option>
        </Select>

        <p>Condition</p>
        <Select
          name="condition"
          onChange={(value) => handleInputChange("condition", value)}
          style={{ width: 200 }}
          value={newCarData.condition} // Make sure to pass the correct value from your state
        >
          <Option value="NEW">NEW</Option>
          <Option value="GOOD">GOOD</Option>
          <Option value="OK">OK</Option>
          <Option value="BAD">BAD</Option>
        </Select>
        <Space height="10px" />
      </Modal>
    </Container>
  );
};

export default CarDashboard;
