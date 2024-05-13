"use client"
import {useState} from 'react';
import {Button, Modal, Input, Select} from 'antd';
import Link from "next/link";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const [selectValue, setSelectedVale] = useState("WALKING");
  const handleChange = (value: string) => {
    setSelectedVale(value);
  };

  const [activityLog, setActivityLog] = useState({
    name1: "",
    name2: "",
    name3: ""
  })
  return (
    <>
      <div>
        <div>
          <Button type="primary" onClick={showModal}>
            Log activity
          </Button>
        </div>
        <div><Button type="link" href={"/nutrition"}>Nutrition tracker</Button></div>
        <div><Button type="link" href={"/activity_logging"}>Activity logging</Button></div>
        <div><Button type="link" href={"/integration"}>Integrate devices</Button></div>
        <div><Button type="link" href={"/share"}>Share progress</Button></div>
        <div><Button type="link" href={"/workout"}>Workout Plan</Button></div>
        <Modal title="Log Activity" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Select
            defaultValue="WALKING"
            style={{width: 120}}
            onChange={handleChange}
            options={[
              {value: 'WALKING', label: 'Walking'},
              {value: 'CYCLING', label: 'Cycling'},
            ]}
            value={selectValue}
          />
          <form onSubmit={(e) => {
            e.preventDefault();
            fetch("/logactivity", {
              method: "POST",
              body: JSON.stringify({
                data: {
                  "type": "CYCLING",
                  "distance": 10,
                  "unit": "MILES"
                }
              })
            })
          }
          }>

            {
              selectValue === "WALKING" && (
                <>
                  <label>Name 1</label>
                  <Input placeholder="Basic usage" value={activityLog.name1} onChange={(e) => {
                    console.log("r.tart", e.target.value)
                    setActivityLog({
                      ...activityLog,
                      name1: e.target.value
                    })
                  }
                  }/>
                  <label>Name 2</label>
                  <Input placeholder="Basic usage" value={activityLog.name2} onChange={(e) => {
                    setActivityLog({
                      ...activityLog,
                      name2: e.target.value
                    })
                  }
                  }/>
                  <label>Name 3</label>
                  <Input placeholder="Basic usage" value={activityLog.name3} onChange={(e) => {
                    setActivityLog({
                      ...activityLog,
                      name3: e.target.value
                    })
                  }
                  }/>
                </>
              )
            }
            {
              selectValue === "CYCLING" && (
                <>
                  <label>Name 1</label>
                  <Input placeholder="Basic usage"/>
                  <label>Name 2</label>
                  <Input placeholder="Basic usage"/>
                  <label>Name 3</label>
                  <Input placeholder="Basic usage"/>
                </>
              )
            }

            <Button type="primary" onClick={showModal} htmlType={"submit"}>
              Log Activity
            </Button>

          </form>

        </Modal>
      </div>
    </>
  )
}

export default HomePage;