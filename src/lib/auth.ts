import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

export interface JwtPayload {
    id?: number;
    username?: string;
    email?: string;
    role?: Role;
}

export function verifyToken(token: string): JwtPayload | undefined {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error);
        return undefined;
    }
}

export function getRoleFromToken(token: string): Role | undefined {
    const decoded = verifyToken(token);
    const rawRole = decoded?.role;
    // Return null if no role or invalid role
    return rawRole && Object.values(Role).includes(rawRole as Role) ? rawRole as Role : undefined;
}

export function getEmailFromToken(token: string): string | undefined  {
    const decoded = verifyToken(token);
    return decoded?.email || undefined;
}

export function getUsernameFromToken(token: string): string | undefined  {
    const decoded = verifyToken(token);
    return decoded?.username || undefined;
}

export function getIdFromToken(token: string): number | undefined {
    const decoded = verifyToken(token);
    // Return the nameidentifier if it exists, null otherwise
    return decoded?.id || undefined;
}