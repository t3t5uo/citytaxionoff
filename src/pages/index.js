import '../app/globals.css'; // Importing global styles

// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [active, setActive] = useState(false);
  
  const workflowId = 'BHIMAdwQuk0BkT94'; // Replace with your actual workflow ID
  // const workflowId = 'fLSLXdA8lBfsdOdS'; // Replace with your actual workflow ID

  useEffect(() => {
    // Fetch workflow status on component 
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/getWorkflowStatus');
        if (response.ok) {
          const { active } = await response.json();
          setActive(active);
        } else {
          console.error('Failed to fetch workflow status');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatus();
  }, []);

  const toggleWorkflow = async () => {
    // Confirmation dialog
    if (window.confirm(`Are you sure you want to ${active ? 'deactivate' : 'activate'} the service?`)) {
      try {
        const response = await fetch('/api/toggleWorkflow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ workflowId, active: !active }),
        });

        if (response.ok) {
          setActive(!active);
        } else {
          console.error('Failed to toggle workflow');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="block text-gray-700 text-xl font-bold mb-2">RapidTaxi + Ghost API</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workflow-status">
            Status:
          </label>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              id="workflow-status"
              className="form-checkbox h-6 w-6 text-green-500 border-gray-300 rounded-md focus:ring-green-500"
              checked={active}
              onChange={toggleWorkflow}
            />
          </div>
          <span className="text-gray-700 ml-2">{active ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
    </div>
  );
}
