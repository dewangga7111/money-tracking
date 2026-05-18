'use server';

import { hash } from 'bcryptjs';
import { requireAuth } from '@/lib/action-guard';
import { getPrismaClient } from '@/lib/prisma';
import type { GetAllUserResponse, GetUserByIdResponse, UserFormData } from '@/types/user';
import type { ActionResponse } from '@/types/response';

export async function getAllUser(
  page: number = 1,
  pageSize: number = 10,
  params?: any
): Promise<GetAllUserResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    const skip = (page - 1) * pageSize;

    const where = {
      status: true,
      ...(params?.name ? { name: { contains: params.name, mode: 'insensitive' as const } } : {}),
      ...(params?.email ? { email: { contains: params.email, mode: 'insensitive' as const } } : {}),
    };

    const totalCount = await prisma.tbUser.count({ where });

    const users = await prisma.tbUser.findMany({
      where,
      include: { role: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    });

    return {
      success: true,
      data: users,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      success: false,
      error: 'Failed to fetch users',
      data: [],
      pagination: { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 },
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserByIdAction(id: string): Promise<GetUserByIdResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    const user = await prisma.tbUser.findUnique({
      where: { userId: id, status: true },
      include: { role: true },
    });

    if (!user) {
      return { success: false, error: 'User not found', data: null as any };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { success: false, error: 'Failed to fetch user', data: null as any };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createUserAction(formData: UserFormData): Promise<ActionResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    const hashedPassword = await hash(formData.password || '', 12);
    await prisma.tbUser.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
        roleId: formData.roleId,
        createdBy: 'SYSTEM',
        updatedBy: 'SYSTEM',
      },
    });

    return { success: true, message: 'User created successfully' };
  } catch (error: any) {
    console.error('Error creating user:', error);
    if (error?.code === 'P2002') {
      return { success: false, error: 'Email already exists' };
    }
    return { success: false, error: 'Failed to create user' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserAction(id: string, formData: UserFormData): Promise<ActionResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    const updateData: any = {
      name: formData.name,
      email: formData.email,
      roleId: formData.roleId,
      updatedBy: 'SYSTEM',
      updatedAt: new Date(),
    };

    if (formData.password) {
      updateData.password = await hash(formData.password, 12);
    }

    await prisma.tbUser.update({
      where: { userId: id },
      data: updateData,
    });

    return { success: true, message: 'User updated successfully' };
  } catch (error: any) {
    console.error('Error updating user:', error);
    if (error?.code === 'P2002') {
      return { success: false, error: 'Email already exists' };
    }
    return { success: false, error: 'Failed to update user' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUserAction(id: string): Promise<ActionResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbUser.update({
      where: { userId: id },
      data: { status: false, updatedBy: 'SYSTEM', updatedAt: new Date() },
    });

    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: 'Failed to delete user' };
  } finally {
    await prisma.$disconnect();
  }
}
