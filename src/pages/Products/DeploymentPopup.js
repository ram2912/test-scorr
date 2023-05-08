import React, { useState } from 'react';

export default function DeploymentPopup({ onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [users, setUsers] = useState([]);

  function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
  }

  function handleDeploy() {
    // Your deploy app logic here
    setIsVisible(false);
    onClose();
  }

  function handleAddUser() {
    const name = document.getElementById('user-name').value;
    const access = document.querySelector('input[name="access"]:checked').value;
    setUsers([...users, { name, access }]);
    document.getElementById('user-name').value = '';
    document.querySelector('input[name="access"]:checked').checked = false;
  }
  function deployApp() {
    {handleDeploy.toString()}
  
    const addUserButton = document.getElementById("add-user-button");
    addUserButton.addEventListener("click", handleAddUser);
  }

  const deploymentHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>App Deployment Popup</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 1rem;
          line-height: 1.5;
          margin: 0;
          padding: 0;
          color: #fff;
        }

        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 80%;
          overflow: auto;
          margin: 0 auto;
          padding: 0.5rem;
          border-radius: 5px;
          background-color: #0B0C11;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          z-index: 9999;
        }

        .popup h2 {
          font-size: 1.5rem;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .popup label {
          display: block;
          margin-bottom: 0.5rem;
          margin-top: 1rem;
        }

        .popup input[type="text"],
        .popup select {
          display: block;
          width: 100%;
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 3px;
          background-color: #fff;
          color: #555;
        }

        .popup input[type="radio"] {
          margin-right: 0.5rem;
        }

        .popup input[type="submit"] {
          display: block;
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        }

        .popup input[type="submit"]:hover {
          background-color: #0069d9;
        }

        .close-btn {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 2rem;
          font-weight: bold;
          color: #aaa;
          cursor: pointer;
        }

        .close-btn:hover {
          color: #555;
        }

        .popup-table {
          margin-top: 1rem;
          border-collapse: collapse;
          width: 100%;
        }

        .popup-table th,
        .popup-table td {
          border: 1px solid #ddd;
          padding: 0.5rem;
        }
        
        
            .popup-table th {
              background-color: #f2f2f2;
            }
        
            .popup-table th:first-child,
            .popup-table td:first-child {
              width: 60%;
            }
        
            .popup-table th:last-child,
            .popup-table td:last-child {
              width: 40%;
            }
          </style>
        </head>
        <body>
          <div class="popup" id="popup">
          <span class="close-btn" onclick="closePopup()">&times;</span>
            <h2>App Deployment</h2>
            <label for="environment">Select environment:</label>
            <select id="environment">
              <option value="salesforce">Salesforce</option>
              <option value="gsheets">Gsheets</option>
              <option value="scorr">Scorr Analytics</option>
            </select>
            <label for="user-name">Add user:</label>
            <input type="text" id="user-name">
            <label for="access">Access level:</label>
            <input type="radio" id="read" name="access" value="read-only">
            <label for="read">Read-only</label>
            <input type="radio" id="manage" name="access" value="manage">
            <label for="manage">Manage</label>
            <input type="radio" id="edit" name="access" value="edit">
            <label for="edit">Edit</label>
            <br><br>
            
            <input type="submit" value="Deploy">
            
            
              
            </table>
          </div>
        </div>
        
        <script>
          function openPopup() {
            document.getElementById("popup").style.display = "flex";
          }
        
          function closePopup() {
            document.getElementById("popup").style.display = "none";
          }
        </script>
          </body>
          </html>
          `;
        
        function handlePopupClick(event) {
          if (event.target.classList.contains('close-btn')) {
            setIsVisible(false);
            onClose();
          }
        }
        
        return (
          <>
            {isVisible && (
              <>
                <div
                  className="backdrop"
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 9998,
                  }}
                ></div>
                <div
                  className="popup"
                  onClick={handlePopupClick}
                  dangerouslySetInnerHTML={{ __html: deploymentHtml }}
                ></div>
              </>
            )}
          </>
        );
        }

  

              
              
              
              
              
