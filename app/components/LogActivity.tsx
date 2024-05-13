"use client"
import {useState} from 'react';
import {Button, Modal, Input, Select, InputNumber} from 'antd';
import Link from "next/link";

function LogActivity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    let data;
    switch (selectValue) {
      case "WALKING":
        data = {
          type: selectValue,
          steps: activityLog.walkingSteps,
        };
        break;
      case "CYCLING":
        data = {
          type: selectValue,
          distance: activityLog.cyclingDistance,
          data: activityLog.cyclingUnit
        };
        break;
    }
    fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        path: '/activity',
        payload: {
          data: data
        }
      })
    }).then(() => {
      setLoading(false);
      setIsModalOpen(false);
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [selectValue, setSelectedVale] = useState("WALKING");
  const handleChange = (value: string) => {
    setSelectedVale(value);
  };

  const [activityLog, setActivityLog] = useState({
    walkingSteps: 0,
    cyclingDistance: 0,
    cyclingUnit: "KILOMETRES"
  })
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Log activity
      </Button>
      <Modal title="Log Activity" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
        <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
          Log Activity
        </Button>
      ]}>
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
        }
        }>
          {
            selectValue === "WALKING" && (
              <>
                <label>Steps</label>
                <InputNumber placeholder="Basic usage" value={activityLog.walkingSteps} onChange={(value) => {
                  console.log("r.tart", value)
                  setActivityLog({
                    ...activityLog,
                    walkingSteps: value
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
                <InputNumber placeholder="Basic usage" value={activityLog.cyclingDistance} onChange={(value) => {
                  console.log("r.tart", value)
                  setActivityLog({
                    ...activityLog,
                    cyclingDistance: value
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
        </form>
      </Modal>
    </>
  )
}

export default LogActivity;