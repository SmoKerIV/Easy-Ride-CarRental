"use client";
import { useState, useEffect } from "react";
import { Button, Input, Modal, Popconfirm, Table } from "antd";
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
    let parsedValue = value;
    if (name === "categoryId" && /^\d+$/.test(value)) {
      parsedValue = parseInt(value, 10);
    } else if (
      name === "priceDay" ||
      name === "priceWeek" ||
      name === "priceMonth"
    ) {
      parsedValue = parseFloat(value);
    }

    if (isEditForm) {
      setEditFormData((prevData) => ({
        ...prevData,
        [name]: parsedValue,
      }));
    } else {
      setNewCarData((prevData) => ({
        ...prevData,
        [name]: parsedValue,
      }));
    }
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
  useEffect(() => {
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
      await setRefresh((prevRefresh) => prevRefresh + 1);
    } catch (error) {
      console.error("Error adding data:", error);
    }
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
        <p>Price (Day)</p>
        <Input
          name="priceDay"
          onChange={(e) => handleInputChange("priceDay", e.target.value)}
        />
        <p>Image</p>
        <Input
          name="image1"
          onChange={(e) => handleInputChange("image1", e.target.value)}
        />
        <p>Category</p>
        <Input
          name="categoryId"
          onChange={(e) => handleInputChange("categoryId", e.target.value)}
        />
        <Space height="10px" />
      </Modal>
    </Container>
  );
};

export default CarDashboard;
