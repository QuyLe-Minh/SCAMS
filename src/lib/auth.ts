import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

export interface JwtPayload {
    id?: number;
    username?: string;
    email?: string;
    role?: Role;
}

export function verifyToken(token: string): JwtPayload | null {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

export function getRoleFromToken(token: string): Role | null {
    const decoded = verifyToken(token);
    const rawRole = decoded?.role;
    // Return null if no role or invalid role
    return rawRole && Object.values(Role).includes(rawRole as Role) ? rawRole as Role : null;
}

export function getEmailFromToken(token: string): string | null  {
    const decoded = verifyToken(token);
    return decoded?.email || null;
}

export function getUsernameFromToken(token: string): string | null  {
    const decoded = verifyToken(token);
    return decoded?.username || null;
}

export function getIdFromToken(token: string): number | null {
    const decoded = verifyToken(token);
    // Return the nameidentifier if it exists, null otherwise
    return decoded?.id || null;
}