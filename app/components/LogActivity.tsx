"use client"
import {CSSProperties, useEffect, useState} from 'react';
import {Button, Modal, Input, Select, InputNumber, Table, Flex} from 'antd';
import Link from "next/link";
import {number} from "prop-types";

interface Activity {
  id: string,
  type: string,
  details: string,
  key: number
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Details',
    dataIndex: 'details',
    key: 'details',
  },
];

function LogActivity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [data, setData] = useState<Activity[]>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  function loadData(response: any[]) {
    let mappedData: Activity[] = []
    let i = 1;
    response = response.slice(0, 20)
    response.forEach((activity) => {
      let info = "";
      switch (activity.data.type) {
        case "WALKING":
          info = "Steps: " + activity.data.steps;
          break;
        case "CYCLING":
          info = "Distance: " + activity.data.distance + " " + activity.data.unit.toLowerCase();
          break;
      }
      mappedData.push({
        key: i++,
        id: activity.id,
        type: activity.data.type,
        details: info,
      })
    })
    setData(mappedData)
  }

  function listActivity() {
    setTableLoading(true);
    fetch("/api/get", {
      method: "POST",
      body: JSON.stringify({
        path: '/activity/'
      })
    }).then((listActivity) => {
      return listActivity.json().then(data => {
        loadData(data);
        setTableLoading(false);
      });
    })
  }

  useEffect(() => listActivity(), [])

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
          unit: activityLog.cyclingUnit
        };
        break;
    }
    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        path: '/activity/',
        payload: {
          data: data
        }
      })
    }).then((response) => {
      setLoading(false);
      setIsModalOpen(false);
      listActivity();
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

  const itemStyle: CSSProperties = {
    marginTop: "8px"
  }

  return (
    <>
      <Flex style={{display: "flex", height: "100%", width: "100%"}} align={"center"} justify={"space-evenly"} vertical>
        <Button type="primary" onClick={showModal}>
          Log activity
        </Button>
        <Table dataSource={data} columns={columns} loading={tableLoading} style={{width: "90%"}}>
        </Table>
        <Modal title="Log Activity" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
          <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
            Log Activity
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>
        ]}>
          <Flex align={"flex-start"} justify={"space-evenly"} vertical>
            <Select
              defaultValue="WALKING"
              style={{width: "100%", ...itemStyle}}
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
            <form
              style={{width: "100%"}} onSubmit={(e) => {
              e.preventDefault();
            }
            }>
              <Flex align={"flex-start"} justify={"space-evenly"} vertical>

              {
                selectValue === "WALKING" && (
                  <>
                    <label
                      style={{width: "100%", ...itemStyle}}
                    >Steps</label>
                    <InputNumber
                      style={{width: "100%", ...itemStyle}}
                      placeholder="Basic usage" value={activityLog.walkingSteps} onChange={(value) => {
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
                    <label
                      style={{...itemStyle}}>Distance</label>
                    <InputNumber
                      style={{width: "100%", ...itemStyle}}
                      placeholder="Basic usage" value={activityLog.cyclingDistance} onChange={(value) => {
                      console.log("r.tart", value)
                      setActivityLog({
                        ...activityLog,
                        cyclingDistance: value
                      })
                    }
                    }/>
                    <label
                      style={{...itemStyle}}>Unit</label>
                    <Input
                      placeholder="Basic usage"
                      style={{width: "100%", ...itemStyle}}
                      value={activityLog.cyclingUnit} onChange={(e) => {
                      setActivityLog({
                        ...activityLog,
                        cyclingUnit: e.target.value
                      })
                    }
                    }/>
                  </>
                )
              }
              </Flex>
            </form>
          </Flex>
        </Modal>
      </Flex>
    </>
  )
}

export default LogActivity;