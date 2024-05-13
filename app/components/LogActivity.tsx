"use client"
import {useState} from 'react';
import {Button, Modal, Input, Select} from 'antd';
import Link from "next/link";

function LogActivity() {
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
    walkingSteps: "",
    cyclingDistance: "",
    cyclingUnit: ""
  })
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Log activity
      </Button>
      <Modal title="Log Activity" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Select
          defaultValue="WALKING"
          style={{width: 120}}
          onChange={handleChange}
          options={[
            {value: 'WALKING', label: 'Walking'},
            {value: 'CYCLING', label: 'Cycling'},
            {value: 'CALORIES_BURNED', label: 'Calories burned'},
            {value: 'SLEEP', label: 'Sleep'},
            {value: 'HEART_RATE', label: 'Heart rate'},
          ]}
          value={selectValue}
        />
        <form onSubmit={(e) => {
          e.preventDefault();
          fetch("/api", {
            method: "POST",
            body: JSON.stringify({
              data: {
                type: selectValue,
                distance: activityLog.cyclingDistance,
                unit: activityLog.cyclingUnit
              }
            })
          })
        }
        }>
          {
            selectValue === "WALKING" && (
              <>
                <label>Steps</label>
                <Input placeholder="Basic usage" value={activityLog.walkingSteps} onChange={(e) => {
                  console.log("r.tart", e.target.value)
                  setActivityLog({
                    ...activityLog,
                    walkingSteps: e.target.value
                  })
                }
                }/>
              </>
            )
          }

          {
            selectValue === "CYCLING" && (
              <>
                <label>Distance</label>
                <Input placeholder="Basic usage" value={activityLog.cyclingDistance} onChange={(e) => {
                  console.log("r.tart", e.target.value)
                  setActivityLog({
                    ...activityLog,
                    cyclingDistance: e.target.value
                  })
                }
                }/>
                <label>Unit</label>
                <Input placeholder="Basic usage" value={activityLog.cyclingUnit} onChange={(e) => {
                  setActivityLog({
                    ...activityLog,
                    cyclingUnit: e.target.value
                  })
                }
                }/>
              </>
            )
          }

          <Button type="primary" onClick={showModal} htmlType={"submit"}>
            Log Activity
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default LogActivity;