"use client";

import React from "react";
import { Box, Flex, Badge, ActionIcon } from "rizzui";
import { PiXBold } from "react-icons/pi";
import { RolesUserType } from "@/types/rolesUserTypes";

type RolesUserDetailsModalProps = {
  user: RolesUserType;
  closeModal?: () => void;
};

export default function RolesUserDetailsModal({
  user,
  closeModal,
}: RolesUserDetailsModalProps) {
  return (
    <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
      {/* Header */}
      <Flex justify="between" align="center" className="border-b pb-4">
        <h2 className="text-xl font-semibold">Role User Details</h2>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={closeModal}
          className="text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </Flex>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {/* User Name */}
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg font-medium text-gray-900">
            {user.name || "N/A"}
          </p>
        </div>

        {/* Email */}
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium text-gray-900">
            {user.email || "N/A"}
          </p>
        </div>

        {/* Is verified */}
        <div>
          <p className="text-sm text-gray-500 mb-1">is Verified</p>
          <Badge
            className={`py-1 px-3 rounded-full text-sm font-medium ${
              user.isVerified
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {user.status || "N/A"}
          </Badge>
        </div>

        {/* Tenant */}
        {user.tenant?.company_name && (
          <div>
            <p className="text-sm text-gray-500">Tenant</p>
            <p className="text-lg font-medium text-gray-900">
              {user.tenant.company_name}
            </p>
          </div>
        )}

        {/* Accessible Modules */}
        {user.accessible_modules && user.accessible_modules.length > 0 && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Accessible Modules</p>
            <div className="flex flex-wrap gap-2">
              {user.accessible_modules.map((module: string, index: number) => (
                <Badge
                  key={index}
                  className="py-1 px-3 rounded-full text-sm font-medium bg-indigo-500 text-white"
                >
                  {module}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Assigned Organization */}
        {user.organization?.name && (
          <div>
            <p className="text-sm text-gray-500">Organization</p>
            <p className="text-lg font-medium text-gray-900">
              {user.organization.name}
            </p>
          </div>
        )}
      </div>
    </Box>
  );
}
