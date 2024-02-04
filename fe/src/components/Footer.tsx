import React from "react";

function Footer() {
  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-white">© 2024 Ground-Up Initiative</div>
          <div className="flex gap-4">
            <a href="#" className="text-white hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-white hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
