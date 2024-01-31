// pages/index.js

import '../app/globals.css'; // Importing global styles
// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [active, setActive] = useState(false);
  const workflowId = 'fLSLXdA8lBfsdOdS'; // Replace with your actual workflow ID

  useEffect(() => {
    // Fetch workflow status on component mount
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
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="block text-gray-700 text-xl font-bold mb-2">Control n8n Workflow</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workflow-status">
            Workflow Status:
          </label>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="workflow-status"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              checked={active}
              onChange={toggleWorkflow}
            />
            <label
              htmlFor="workflow-status"
              className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${active ? 'bg-green-400' : 'bg-gray-300'}`}></label>
          </div>
          <span className="text-gray-700">{active ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
    </div>
  );
}
