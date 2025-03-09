import React, { useEffect, useState } from "react";

export default function Dashboard({ page, setpage }) {
  const [defaultstate, setdefaultstate] = useState(false);
  const [isChecked, setIsChecked] = useState(defaultstate);



  const handleCheckboxChange = ({ value }) => {
    chrome.runtime.sendMessage(
      { action: "sendToContent", data: { isChecked: value } },
      (response) => {
        //console.log("Response from Content:", response);
      }
    );

    setIsChecked(value);
  };


  // const handledefaultchange = () => {
  //   chrome.storage.local.get(["autotoken69"], (tokenResult) => {
  //           const token = tokenResult.autotoken69;
  //           if (!token) {
  //             console.log("No token found.");
  //             return;
  //           }
      
  //           console.log("Token retrieved:", token);
      
  //           // Send content to the backend
  //           fetch("http://127.0.0.1:8787/setalwayson", {
  //             method: "POST",
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ content: JSON.stringify({alwayson:!defaultstate})}),
  //           })
  //             .then((response) => response.json())
  //             .then((data) => {
  //               if (data.success) {
  //                 setdefaultstate(data.res.alwayson);
  //                 console.log("default state updated", data.res.alwayson);
  //               } else {
  //                 console.error("Backend returned failure:", data);
  //               }
  //             })
  //             .catch((error) => {
  //               console.error("Error storing tabs in the backend:", error);
  //             });
  //         });
    
  // };



  useEffect(()=>{
      chrome.storage.local.get(["autotoken69"], (tokenResult) => {
        const token = tokenResult.autotoken69;
        if (!token) {
          console.log("No token found.");
          return;
        }
    
        console.log("Token retrieved:", token);
    
        // Send request to backend
        fetch("http://127.0.0.1:8787/getalwayson", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(4), // ✅ Fix: Removed extra stringify
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Received response from backend:", data); // ✅ Debugging
            if (data.success) {
              setdefaultstate(data.res.alwayson);
              console.log("Default state updated:", data.res.alwayson);
            } else {
              console.error("Backend returned failure:", data);
            }
          })
          .catch((error) => {
            console.error("Error updating default state:", error);
          });
      });
    },[])



  const handledefaultchange = () => {
    chrome.storage.local.get(["autotoken69"], (tokenResult) => {
      const token = tokenResult.autotoken69;
      if (!token) {
        console.log("No token found.");
        return;
      }
  
      console.log("Token retrieved:", token);
  
      // Send request to backend
      fetch("http://127.0.0.1:8787/setalwayson", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ alwayson: !defaultstate }), // ✅ Fix: Removed extra stringify
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Received response from backend:", data); // ✅ Debugging
          if (data.success) {
            setdefaultstate(data.res.alwayson);
            console.log("Default state updated:", data.res.alwayson);
          } else {
            console.error("Backend returned failure:", data);
          }
        })
        .catch((error) => {
          console.error("Error updating default state:", error);
        });
    });
  };
  







  // useEffect(() => {
  //   chrome.storage.local.get(["autotoken69"], (result) => {
  //     const token = result.autotoken69;
  //     console.log(token);
  //   });
  // }, []);
  // useEffect(() => {
  //   setloadfolders(true);
  //   chrome.storage.local.get(["autotoken69"], (result) => {
  //     if (result.autotoken69) {
  //       const token = result.autotoken69;
  //       console.log(token + " ");
  //       fetch(
  //         "https://extensionbackend.hamdidcarel.workers.dev/getmanfolders",
  //         {
  //           method: "POST",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ message: "hi" }),
  //         }
  //       )
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (data.success == false) {
  //             //alert("Failed to save tabs")
  //           } else if (data.success == true) {
  //             setloadfolders(false);
  //             setfolders(data.folders);
  //             //console.log(folders);
  //             //alert("Tabs saved successfully")
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error storing tabs in the backend:", error);
  //         });
  //     }
  //   });
  // }, []);

  return (
    <div>
      <div>
        <div className="popup shadow-md rounded-lg overflow-hidden">
          <header className="flex justify-between items-center bg-gray-200 px-4 py-2">
            <h1 className="text-lg font-semibold">AutoNote</h1>
            <button
              className="text-gray-500 hover:text-red-500 focus:outline-none"
              onClick={() => {
                chrome.storage.local.remove(["autotoken69"], () => {
                  chrome.runtime.sendMessage({
                    action: "removeToken",
                    autotoken69: "autotoken69",
                  });
                  chrome.runtime.sendMessage({
                    action: "removesavedtabs",
                    laststore: "laststore",
                  });
                  console.log("authToken removed from local storage");
                });
                setpage("login");
              }}
            >
              Log Out
            </button>
          </header>
          <main className="px-4 py-5">
            <div className="flex justify-center my-6 pb-4">
              <span className="inline-flex">
                <span className="pt-2 mr-4 ">
                  <button
                    className="font-bold px-3 py-2  rounded-md bg-green-400"
                    onClick={() => {
                      handleCheckboxChange({ value: false });
                    }}
                  >
                    Show FLoating Menu
                  </button>
                </span>
                <span className="pt-2 mr-4 ">
                  <button
                    className="font-bold px-3 py-2 rounded-md bg-gray-400"
                    onClick={() => {
                      handleCheckboxChange({ value: true });
                    }}
                  >
                    Hide FLoating Menu
                  </button>
                </span>
              </span>
            </div>

            <hr class="border-t-4 border-gray-400 my-4 "></hr>
            <div className="w-full mt-4">
              <div className="text-center text-xl font-bold">
                On Website load :
              </div>
            </div>
            <div className="flex justify-center mt-2 mb-5">
              <span className="inline-flex">
                <span className={`pt-2 mr-5  ${
                        !defaultstate ? "text-blue-600 font-bold" : ""
                      }`}>
                  
                    Always Hide
                  
                </span>
                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={defaultstate}
                      onChange={handledefaultchange}
                      className="sr-only"
                    />
                    <div
                      className={`box block h-8 w-14 rounded-full ${
                        defaultstate ? "bg-blue-600" : "bg-gray-400"
                      }`}
                    ></div>
                    <div
                      className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                        defaultstate ? "translate-x-full" : ""
                      }`}
                    ></div>
                  </div>
                </label>
                <span className={`pt-2 ml-5  ${
                        defaultstate ? "text-blue-600 font-bold" : ""
                      }`}>
                    Always show
                </span>
              </span>
            </div>
          </main>
        </div>
        {/* <div className="flex justify-between">
          <div>Tabs Dashboard</div>
          <button
            onClick={() => {
              chrome.storage.local.remove(["token69"], () => {
                chrome.runtime.sendMessage({
                  action: "removeToken",
                  token69: "token69",
                });
                chrome.runtime.sendMessage({
                  action: "removesavedtabs",
                  laststore: "laststore",
                });
                console.log("authToken removed from local storage");
              });
              setpage("login");
            }}
          >
            log out
          </button>
        </div> */}
      </div>
    </div>
  );
}
