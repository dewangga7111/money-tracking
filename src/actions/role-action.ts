'use server';

import { requireAuth } from '@/lib/action-guard';
import { getPrismaClient } from '@/lib/prisma';
import type { GetAllRoleResponse, GetRoleByIdResponse, RoleFormData } from '@/types/role';
import type { ActionResponse } from '@/types/response';

export async function getAllRole(
  page: number = 1,
  pageSize: number = 10,
  params?: any
): Promise<GetAllRoleResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    const skip = (page - 1) * pageSize;

    const where = {
      status: true,
      ...(params?.name ? { name: { contains: params.name, mode: 'insensitive' as const } } : {}),
    };

    const totalCount = await prisma.tbRole.count({ where });

    const roles = await prisma.tbRole.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    });

    return {
      success: true,
      data: roles,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching roles:', error);
    return {
      success: false,
      error: 'Failed to fetch roles',
      data: [],
      pagination: { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 },
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getRoleByIdAction(id: string): Promise<GetRoleByIdResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    const role = await prisma.tbRole.findUnique({
      where: { roleId: id, status: true },
    });

    if (!role) {
      return { success: false, error: 'Role not found', data: null as any };
    }

    return { success: true, data: role };
  } catch (error) {
    console.error('Error fetching role:', error);
    return { success: false, error: 'Failed to fetch role', data: null as any };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createRoleAction(formData: RoleFormData): Promise<ActionResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbRole.create({
      data: {
        name: formData.name,
        description: formData.description ?? null,
        createdBy: 'SYSTEM',
        updatedBy: 'SYSTEM',
      },
    });

    return { success: true, message: 'Role created successfully' };
  } catch (error) {
    console.error('Error creating role:', error);
    return { success: false, error: 'Failed to create role' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateRoleAction(id: string, formData: RoleFormData): Promise<ActionResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbRole.update({
      where: { roleId: id },
      data: {
        name: formData.name,
        description: formData.description ?? null,
        updatedBy: 'SYSTEM',
        updatedAt: new Date(),
      },
    });

    return { success: true, message: 'Role updated successfully' };
  } catch (error) {
    console.error('Error updating role:', error);
    return { success: false, error: 'Failed to update role' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteRoleAction(id: string): Promise<ActionResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbRole.update({
      where: { roleId: id },
      data: { status: false, updatedBy: 'SYSTEM', updatedAt: new Date() },
    });

    return { success: true, message: 'Role deleted successfully' };
  } catch (error) {
    console.error('Error deleting role:', error);
    return { success: false, error: 'Failed to delete role' };
  } finally {
    await prisma.$disconnect();
  }
}
