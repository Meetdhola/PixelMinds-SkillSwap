import { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";

export default function RequestModal({ targetUser, onClose }) {
  const { user } = useAuth();

  const [offerSkill, setOfferSkill] = useState(
    targetUser.skillsWanted?.[0] || ""
  );
  const [wantSkill, setWantSkill] = useState(
    targetUser.skillsOffered?.[0] || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!offerSkill || !wantSkill) {
      alert("Both skills must be selected.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("requests") || "[]");

    // Check for duplicate request
    const alreadySent = existing.find(
      (r) =>
        r.from === user.name &&
        r.to === targetUser.name &&
        r.offerSkill === offerSkill &&
        r.wantSkill === wantSkill
    );

    if (alreadySent) {
      alert("You have already sent this request.");
      return;
    }

    const newRequest = {
      id: Date.now(),
      from: user.name,
      to: targetUser.name,
      offerSkill,
      wantSkill,
      status: "pending",
    };

    localStorage.setItem("requests", JSON.stringify([...existing, newRequest]));
    alert("Skill swap request sent!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Request Skill Swap</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm">I Can Offer</label>
            <select
              className="w-full p-2 rounded bg-gray-800"
              value={offerSkill}
              onChange={(e) => setOfferSkill(e.target.value)}
              required
            >
              {targetUser.skillsWanted.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm">I Want to Learn</label>
            <select
              className="w-full p-2 rounded bg-gray-800"
              value={wantSkill}
              onChange={(e) => setWantSkill(e.target.value)}
              required
            >
              {targetUser.skillsOffered.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-500"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-500">
              Send Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
