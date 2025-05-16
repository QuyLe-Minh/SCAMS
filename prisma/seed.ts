//prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { encrypt, decrypt } from "@/lib/util";

import { Role } from "@prisma/client";

async function main() {
  await prisma.user.createMany({
    data: [
      {
        username: 'guest_user_1',
        email: 'guest1@example.com',
        password: encrypt('password123'),
        role: Role.Guest,
      },
      {
        username: 'student_user_1',
        email: 'student1@example.com',
        password:  encrypt('password123'),
        role: Role.Student,
      },
      {
        username: 'student_user_2',
        email: 'student2@example.com',
        password: encrypt('password123'),
        role: Role.Student,
      },
      {
        username: 'staff_user_1',
        email: 'staff1@example.com',
        password: encrypt('password123'),
        role: Role.Staff,
      },
    ],
    skipDuplicates: true, // optional: prevent crashing if duplicate emails exist
  });
  const lecturer = await prisma.user.create({
    data:{
      username: 'lecturer_user_1',
      email: 'lecturer1@example.com',
      password: encrypt('password123'),
      role: Role.Lecturer,
    }
  })
  console.log('🌱 Test users created!');

  const a4Rooms = [
    // Floor 1 (3 rooms)
    {
      name: "A4-101",
      description: "Room 101 on floor 1 of A4 building",
      latitude: 10.77342740543409,
      longitude: 106.66005102504788,
      capacity: 30,
      floor: 1,
    },
    {
      name: "A4-102",
      description: "Room 102 on floor 1 of A4 building",
      latitude: 10.773467588151695,
      longitude: 106.65999335755293,
      capacity: 30,
      floor: 1,
    },
    {
      name: "A4-103",
      description: "Room 103 on floor 1 of A4 building",
      latitude: 10.773526874118705,
      longitude: 106.65991758514679,
      capacity: 30,
      floor: 1,
    },

    // Floor 2 (5 rooms)
    {
      name: "A4-202",
      description: "Room 202 on floor 2 of A4 building",
      latitude: 10.77340039737602,
      longitude: 106.66007784713723,
      capacity: 30,
      floor: 2,
    },
    {
      name: "A4-203",
      description: "Room 203 on floor 2 of A4 building",
      latitude: 10.773450461093441,
      longitude: 106.66003761400123,
      capacity: 30,
      floor: 2,
    },
    {
      name: "A4-204",
      description: "Room 204 on floor 2 of A4 building",
      latitude: 10.773525556653949,
      longitude: 106.65998732258123,
      capacity: 30,
      floor: 2,
    },
    {
      name: "A4-205",
      description: "Room 205 on floor 2 of A4 building",
      latitude: 10.773578914015824,
      longitude: 106.65995178331173,
      capacity: 30,
      floor: 2,
    },
    {
      name: "A4-206",
      description: "Room 206 on floor 2 of A4 building",
      latitude: 10.773642152356842,
      longitude: 106.65996921767068,
      capacity: 30,
      floor: 2,
    },

    // Floor 3
    {
      name: "A4-302",
      description: "Room 302 on floor 3 of A4 building",
      latitude: 10.77340039737602,
      longitude: 106.66007784713723,
      capacity: 30,
      floor: 3,
    },
    {
      name: "A4-303",
      description: "Room 303 on floor 3 of A4 building",
      latitude: 10.773450461093441,
      longitude: 106.66003761400123,
      capacity: 30,
      floor: 3,
    },
    {
      name: "A4-304",
      description: "Room 304 on floor 3 of A4 building",
      latitude: 10.773525556653949,
      longitude: 106.65998732258123,
      capacity: 30,
      floor: 3,
    },
    {
      name: "A4-305",
      description: "Room 305 on floor 3 of A4 building",
      latitude: 10.773578914015824,
      longitude: 106.65995178331173,
      capacity: 30,
      floor: 3,
    },
    {
      name: "A4-306",
      description: "Room 306 on floor 3 of A4 building",
      latitude: 10.773642152356842,
      longitude: 106.65996921767068,
      capacity: 30,
      floor: 3,
    },

    // Floor 4
    {
      name: "A4-402",
      description: "Room 402 on floor 4 of A4 building",
      latitude: 10.77340039737602,
      longitude: 106.66007784713723,
      capacity: 30,
      floor: 4,
    },
    {
      name: "A4-403",
      description: "Room 403 on floor 4 of A4 building",
      latitude: 10.773450461093441,
      longitude: 106.66003761400123,
      capacity: 30,
      floor: 4,
    },
    {
      name: "A4-404",
      description: "Room 404 on floor 4 of A4 building",
      latitude: 10.773525556653949,
      longitude: 106.65998732258123,
      capacity: 30,
      floor: 4,
    },
    {
      name: "A4-405",
      description: "Room 405 on floor 4 of A4 building",
      latitude: 10.773578914015824,
      longitude: 106.65995178331173,
      capacity: 30,
      floor: 4,
    },
    {
      name: "A4-406",
      description: "Room 406 on floor 4 of A4 building",
      latitude: 10.773642152356842,
      longitude: 106.65996921767068,
      capacity: 30,
      floor: 4,
    },

    // Floor 5
    {
      name: "A4-502",
      description: "Room 502 on floor 5 of A4 building",
      latitude: 10.77340039737602,
      longitude: 106.66007784713723,
      capacity: 30,
      floor: 5,
    },
    {
      name: "A4-503",
      description: "Room 503 on floor 5 of A4 building",
      latitude: 10.773450461093441,
      longitude: 106.66003761400123,
      capacity: 30,
      floor: 5,
    },
    {
      name: "A4-504",
      description: "Room 504 on floor 5 of A4 building",
      latitude: 10.773525556653949,
      longitude: 106.65998732258123,
      capacity: 30,
      floor: 5,
    },
    {
      name: "A4-505",
      description: "Room 505 on floor 5 of A4 building",
      latitude: 10.773578914015824,
      longitude: 106.65995178331173,
      capacity: 30,
      floor: 5,
    },
    {
      name: "A4-506",
      description: "Room 506 on floor 5 of A4 building",
      latitude: 10.773642152356842,
      longitude: 106.65996921767068,
      capacity: 30,
      floor: 5,
    },
  ]
  await prisma.building.create({ data: {
    name: "A4",
    rooms: {
      create: a4Rooms
  }}});
  console.log("🌱 A4 building's room data seeded successfully.");

  const a5Rooms = [
    // Floor 1 - Subrooms marked as Computer Labs
    {
      name: "A5-101-1",
      description: "Computer Lab - Subroom 1 of Room 101 on floor 1 of A5 building",
      latitude: 10.773487422984985,
      longitude: 106.65957650769911,
      capacity: 20,
      floor: 1,
    },
    {
      name: "A5-101-2",
      description: "Computer Lab - Subroom 2 of Room 101 on floor 1 of A5 building",
      latitude: 10.773437287303594,
      longitude: 106.65957252057147,
      capacity: 20,
      floor: 1,
    },

    // Floor 1 - Other rooms
    {
      name: "A5-102",
      description: "Room 102 on floor 1 of A5 building",
      latitude: 10.77349447331617,
      longitude: 106.65959245620958,
      capacity: 30,
      floor: 1,
    },
    {
      name: "A5-103",
      description: "Room 103 on floor 1 of A5 building",
      latitude: 10.773496823426306,
      longitude: 106.65976868725026,
      capacity: 30,
      floor: 1,
    },
    {
      name: "A5-104",
      description: "Room 104 on floor 1 of A5 building",
      latitude: 10.773394985317918,
      longitude: 106.65984205039872,
      capacity: 30,
      floor: 1,
    },

    // Floor 2 - Auditorium
    {
      name: "A5 Auditorium",
      description: "Auditorium on floor 2 of A5 building",
      latitude: 10.773378534541708,
      longitude: 106.65967219876279,
      capacity: 100,
      floor: 2,
    }
  ]
  await prisma.building.create({ data: {
    name: "A5",
    rooms: {
      create: a5Rooms
  }}});
  console.log("🌱 A5 building's room data seeded successfully.");

  const b1Rooms =  [
    // Floor 1
    {
      name: "B1-101",
      description: "Room 101 on floor 1 of B1 building",
      latitude: 10.771322646211681,
      longitude: 106.65862375968172,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B1-102",
      description: "Room 102 on floor 1 of B1 building",
      latitude: 10.771477291078554,
      longitude: 106.65852892927074,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B1-103",
      description: "Room 103 on floor 1 of B1 building",
      latitude: 10.771585356119111,
      longitude: 106.6584568581584,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B1-104",
      description: "Room 104 on floor 1 of B1 building",
      latitude: 10.771699010688895,
      longitude: 106.65838858026247,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B1-105",
      description: "Room 105 on floor 1 of B1 building",
      latitude: 10.771845799192246,
      longitude: 106.65840805934997,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B1-106",
      description: "Room 106 on floor 1 of B1 building",
      latitude: 10.771886789334443,
      longitude: 106.65852944227605,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B1-107",
      description: "Room 107 on floor 1 of B1 building",
      latitude: 10.771948274539637,
      longitude: 106.65866599806682,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B1-108",
      description: "Room 108 on floor 1 of B1 building",
      latitude: 10.771931505849189,
      longitude: 106.6588063470751,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B1-109",
      description: "Room 109 on floor 1 of B1 building",
      latitude: 10.771858841513152,
      longitude: 106.6588366928066,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B1-110",
      description: "Room 110 on floor 1 of B1 building",
      latitude: 10.771773134837865,
      longitude: 106.65889359105321,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B1-111",
      description: "Room 111 on floor 1 of B1 building",
      latitude: 10.771676249001647,
      longitude: 106.65896566216556,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B1-112",
      description: "Room 112 on floor 1 of B1 building",
      latitude: 10.77156445761343,
      longitude: 106.6590187671957,
      capacity: 30,
      floor: 1,
    },

    // Floor 2
    {
      name: "B1-201",
      description: "Room 201 on floor 2 of B1 building",
      latitude: 10.771322646211681,
      longitude: 106.65862375968172,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B1-202",
      description: "Room 202 on floor 2 of B1 building",
      latitude: 10.771477291078554,
      longitude: 106.65852892927074,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B1-203",
      description: "Room 203 on floor 2 of B1 building",
      latitude: 10.771585356119111,
      longitude: 106.6584568581584,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B1-204",
      description: "Room 204 on floor 2 of B1 building",
      latitude: 10.771699010688895,
      longitude: 106.65838858026247,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B1-205",
      description: "Room 205 on floor 2 of B1 building",
      latitude: 10.771845799192246,
      longitude: 106.65840805934997,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B1-206",
      description: "Room 206 on floor 2 of B1 building",
      latitude: 10.771886789334443,
      longitude: 106.65852944227605,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B1-207",
      description: "Room 207 on floor 2 of B1 building",
      latitude: 10.771948274539637,
      longitude: 106.65866599806682,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B1-208",
      description: "Room 208 on floor 2 of B1 building",
      latitude: 10.771931505849189,
      longitude: 106.6588063470751,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B1-209",
      description: "Room 209 on floor 2 of B1 building",
      latitude: 10.771858841513152,
      longitude: 106.6588366928066,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B1-210",
      description: "Room 210 on floor 2 of B1 building",
      latitude: 10.771773134837865,
      longitude: 106.65889359105321,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B1-211",
      description: "Room 211 on floor 2 of B1 building",
      latitude: 10.771676249001647,
      longitude: 106.65896566216556,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B1-212",
      description: "Room 212 on floor 2 of B1 building",
      latitude: 10.77156445761343,
      longitude: 106.6590187671957,
      capacity: 30,
      floor: 2,
    },

    // Floor 3
    {
      name: "B1-301",
      description: "Room 301 on floor 3 of B1 building",
      latitude: 10.771322646211681,
      longitude: 106.65862375968172,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B1-302",
      description: "Room 302 on floor 3 of B1 building",
      latitude: 10.771477291078554,
      longitude: 106.65852892927074,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B1-303",
      description: "Room 303 on floor 3 of B1 building",
      latitude: 10.771585356119111,
      longitude: 106.6584568581584,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B1-304",
      description: "Room 304 on floor 3 of B1 building",
      latitude: 10.771699010688895,
      longitude: 106.65838858026247,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B1-305",
      description: "Room 305 on floor 3 of B1 building",
      latitude: 10.771845799192246,
      longitude: 106.65840805934997,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B1-306",
      description: "Room 306 on floor 3 of B1 building",
      latitude: 10.771886789334443,
      longitude: 106.65852944227605,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B1-307",
      description: "Room 307 on floor 3 of B1 building",
      latitude: 10.771948274539637,
      longitude: 106.65866599806682,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B1-308",
      description: "Room 308 on floor 3 of B1 building",
      latitude: 10.771931505849189,
      longitude: 106.6588063470751,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B1-309",
      description: "Room 309 on floor 3 of B1 building",
      latitude: 10.771858841513152,
      longitude: 106.6588366928066,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B1-310",
      description: "Room 310 on floor 3 of B1 building",
      latitude: 10.771773134837865,
      longitude: 106.65889359105321,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B1-311",
      description: "Room 311 on floor 3 of B1 building",
      latitude: 10.771676249001647,
      longitude: 106.65896566216556,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B1-312",
      description: "Room 312 on floor 3 of B1 building",
      latitude: 10.77156445761343,
      longitude: 106.6590187671957,
      capacity: 30,
      floor: 3,
    }
  ]
  await prisma.building.create({ data: {
    name: "B1",
    rooms: {
      create: b1Rooms
  }}});
  console.log("🌱 B1 building's room data seeded successfully.");

  const b4Rooms = [
    { name: "B4-101", description: "Room 101 on floor 1 of B4 building", latitude: 10.772986532097429, longitude: 106.65847795403401, capacity: 30, floor: 1 },
    { name: "B4-102", description: "Room 102 on floor 1 of B4 building", latitude: 10.773033534369329, longitude: 106.65855769658664, capacity: 30, floor: 1 },
    { name: "B4-103", description: "Room 103 on floor 1 of B4 building", latitude: 10.773083670117956, longitude: 106.658658172203, capacity: 30, floor: 1 },
    { name: "B4-104", description: "Room 104 on floor 1 of B4 building", latitude: 10.773176107882575, longitude: 106.65879532939358, capacity: 30, floor: 1 },
    { name: "B4-105", description: "Room 105 on floor 1 of B4 building", latitude: 10.773230943831221, longitude: 106.65891175352044, capacity: 30, floor: 1 },
    { name: "B4-106", description: "Room 106 on floor 1 of B4 building", latitude: 10.773284213028921, longitude: 106.65898990122206, capacity: 30, floor: 1 },
  
    { name: "B4-201", description: "Room 201 on floor 2 of B4 building", latitude: 10.772986532097429, longitude: 106.65847795403401, capacity: 30, floor: 2 },
    { name: "B4-202", description: "Room 202 on floor 2 of B4 building", latitude: 10.773033534369329, longitude: 106.65855769658664, capacity: 30, floor: 2 },
    { name: "B4-203", description: "Room 203 on floor 2 of B4 building", latitude: 10.773083670117956, longitude: 106.658658172203, capacity: 30, floor: 2 },
    { name: "B4-204", description: "Room 204 on floor 2 of B4 building", latitude: 10.773176107882575, longitude: 106.65879532939358, capacity: 30, floor: 2 },
    { name: "B4-205", description: "Room 205 on floor 2 of B4 building", latitude: 10.773230943831221, longitude: 106.65891175352044, capacity: 30, floor: 2 },
    { name: "B4-206", description: "Room 206 on floor 2 of B4 building", latitude: 10.773284213028921, longitude: 106.65898990122206, capacity: 30, floor: 2 },
  
    { name: "B4-301", description: "Room 301 on floor 3 of B4 building", latitude: 10.772986532097429, longitude: 106.65847795403401, capacity: 30, floor: 3 },
    { name: "B4-302", description: "Room 302 on floor 3 of B4 building", latitude: 10.773033534369329, longitude: 106.65855769658664, capacity: 30, floor: 3 },
    { name: "B4-303", description: "Room 303 on floor 3 of B4 building", latitude: 10.773083670117956, longitude: 106.658658172203, capacity: 30, floor: 3 },
    { name: "B4-304", description: "Room 304 on floor 3 of B4 building", latitude: 10.773176107882575, longitude: 106.65879532939358, capacity: 30, floor: 3 },
    { name: "B4-305", description: "Room 305 on floor 3 of B4 building", latitude: 10.773230943831221, longitude: 106.65891175352044, capacity: 30, floor: 3 },
    { name: "B4-306", description: "Room 306 on floor 3 of B4 building", latitude: 10.773284213028921, longitude: 106.65898990122206, capacity: 30, floor: 3 },
  
    { name: "B4-401", description: "Room 401 on floor 4 of B4 building", latitude: 10.772986532097429, longitude: 106.65847795403401, capacity: 30, floor: 4 },
    { name: "B4-402", description: "Room 402 on floor 4 of B4 building", latitude: 10.773033534369329, longitude: 106.65855769658664, capacity: 30, floor: 4 },
    { name: "B4-403", description: "Room 403 on floor 4 of B4 building", latitude: 10.773083670117956, longitude: 106.658658172203, capacity: 30, floor: 4 },
    { name: "B4-404", description: "Room 404 on floor 4 of B4 building", latitude: 10.773176107882575, longitude: 106.65879532939358, capacity: 30, floor: 4 },
    { name: "B4-405", description: "Room 405 on floor 4 of B4 building", latitude: 10.773230943831221, longitude: 106.65891175352044, capacity: 30, floor: 4 },
    { name: "B4-406", description: "Room 406 on floor 4 of B4 building", latitude: 10.773284213028921, longitude: 106.65898990122206, capacity: 30, floor: 4 },
  
    { name: "B4-501", description: "Room 501 on floor 5 of B4 building", latitude: 10.772986532097429, longitude: 106.65847795403401, capacity: 30, floor: 5 },
    { name: "B4-502", description: "Room 502 on floor 5 of B4 building", latitude: 10.773033534369329, longitude: 106.65855769658664, capacity: 30, floor: 5 },
    { name: "B4-503", description: "Room 503 on floor 5 of B4 building", latitude: 10.773083670117956, longitude: 106.658658172203, capacity: 30, floor: 5 },
    { name: "B4-504", description: "Room 504 on floor 5 of B4 building", latitude: 10.773176107882575, longitude: 106.65879532939358, capacity: 30, floor: 5 },
    { name: "B4-505", description: "Room 505 on floor 5 of B4 building", latitude: 10.773230943831221, longitude: 106.65891175352044, capacity: 30, floor: 5 },
    { name: "B4-506", description: "Room 506 on floor 5 of B4 building", latitude: 10.773284213028921, longitude: 106.65898990122206, capacity: 30, floor: 5 },
  
    { name: "B4-601", description: "Room 601 on floor 6 of B4 building", latitude: 10.772986532097429, longitude: 106.65847795403401, capacity: 30, floor: 6 },
    { name: "B4-602", description: "Room 602 on floor 6 of B4 building", latitude: 10.773033534369329, longitude: 106.65855769658664, capacity: 30, floor: 6 },
    { name: "B4-603", description: "Room 603 on floor 6 of B4 building", latitude: 10.773083670117956, longitude: 106.658658172203, capacity: 30, floor: 6 },
    { name: "B4-604", description: "Room 604 on floor 6 of B4 building", latitude: 10.773176107882575, longitude: 106.65879532939358, capacity: 30, floor: 6 },
    { name: "B4-605", description: "Room 605 on floor 6 of B4 building", latitude: 10.773230943831221, longitude: 106.65891175352044, capacity: 30, floor: 6 },
    { name: "B4-606", description: "Room 606 on floor 6 of B4 building", latitude: 10.773284213028921, longitude: 106.65898990122206, capacity: 30, floor: 6 },
  ];
  await prisma.building.create({ data: {
    name: "B4",
    rooms: {
      create: b4Rooms
  }}});
  console.log("🌱 B4 building's room data seeded successfully.");

  const b6Rooms = [
    // Floor 2
    {
      name: "B6-201",
      description: "Room 201 on floor 2 of B6 building",
      latitude: 10.773642586260834,
      longitude: 106.6588829109902,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B6-202",
      description: "Room 202 on floor 2 of B6 building",
      latitude: 10.773705255818538,
      longitude: 106.65899455056392,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B6-203",
      description: "Room 203 on floor 2 of B6 building",
      latitude: 10.77376635862475,
      longitude: 106.65911735409502,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B6-204",
      description: "Room 204 on floor 2 of B6 building",
      latitude: 10.77383372837105,
      longitude: 106.65921942456241,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B6-205",
      description: "Room 205 on floor 2 of B6 building",
      latitude: 10.77386819660752,
      longitude: 106.65930395166822,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B6-206",
      description: "Room 206 on floor 2 of B6 building",
      latitude: 10.773916765479495,
      longitude: 106.65938688392299,
      capacity: 30,
      floor: 2,
    },
  
    // Floor 3
    {
      name: "B6-301",
      description: "Room 301 on floor 3 of B6 building",
      latitude: 10.773642586260834,
      longitude: 106.6588829109902,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B6-302",
      description: "Room 302 on floor 3 of B6 building",
      latitude: 10.773705255818538,
      longitude: 106.65899455056392,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B6-303",
      description: "Room 303 on floor 3 of B6 building",
      latitude: 10.77376635862475,
      longitude: 106.65911735409502,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B6-304",
      description: "Room 304 on floor 3 of B6 building",
      latitude: 10.77383372837105,
      longitude: 106.65921942456241,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B6-305",
      description: "Room 305 on floor 3 of B6 building",
      latitude: 10.77386819660752,
      longitude: 106.65930395166822,
      capacity: 30,
      floor: 3,
    },
    {
      name: "B6-306",
      description: "Room 306 on floor 3 of B6 building",
      latitude: 10.773916765479495,
      longitude: 106.65938688392299,
      capacity: 30,
      floor: 3,
    },
  ];
  await prisma.building.create({ data: {
    name: "B6",
    rooms: {
      create: b6Rooms
  }}});
  console.log("🌱 B6 building's room data seeded successfully.");

  const b9Rooms = [
    // Floor 1
    {
      name: "B9-101",
      description: "Room 101 on floor 1 of B9 building",
      latitude: 10.77347738059782,
      longitude: 106.66034256690357,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B9-102",
      description: "Room 102 on floor 1 of B9 building",
      latitude: 10.773537984028668,
      longitude: 106.6604887472977,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B9-103",
      description: "Room 103 on floor 1 of B9 building",
      latitude: 10.77360780970559,
      longitude: 106.66060140007852,
      capacity: 30,
      floor: 1,
    },
  
    // Floor 2
    {
      name: "B9-201",
      description: "Room 201 on floor 2 of B9 building",
      latitude: 10.77347738059782,
      longitude: 106.66034256690357,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B9-202",
      description: "Room 202 on floor 2 of B9 building",
      latitude: 10.773537984028668,
      longitude: 106.6604887472977,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B9-203",
      description: "Room 203 on floor 2 of B9 building",
      latitude: 10.77360780970559,
      longitude: 106.66060140007852,
      capacity: 30,
      floor: 2,
    },
  ];
  await prisma.building.create({ data: {
    name: "B9",
    rooms: {
      create: b9Rooms
  }}});
  console.log("🌱 B9 building's room data seeded successfully.");

  const b10Rooms = [
    // Floor 1
    {
      name: "B10-101",
      description: "Room 101 on floor 1 of B10 building",
      latitude: 10.773755365803945,
      longitude: 106.66085084551554,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B10-102",
      description: "Room 102 on floor 1 of B10 building",
      latitude: 10.773830461288412,
      longitude: 106.66098093265528,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B10-103",
      description: "Room 103 on floor 1 of B10 building",
      latitude: 10.773909509146568,
      longitude: 106.66113247746756,
      capacity: 30,
      floor: 1,
    },
    {
      name: "B10-104",
      description: "Room 104 on floor 1 of B10 building",
      latitude: 10.773980652201162,
      longitude: 106.6612504946665,
      capacity: 30,
      floor: 1,
    },
  
    // Floor 2
    {
      name: "B10-201",
      description: "Room 201 on floor 2 of B10 building",
      latitude: 10.773755365803945,
      longitude: 106.66085084551554,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B10-202",
      description: "Room 202 on floor 2 of B10 building",
      latitude: 10.773830461288412,
      longitude: 106.66098093265528,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B10-203",
      description: "Room 203 on floor 2 of B10 building",
      latitude: 10.773909509146568,
      longitude: 106.66113247746756,
      capacity: 30,
      floor: 2,
    },
    {
      name: "B10-204",
      description: "Room 204 on floor 2 of B10 building",
      latitude: 10.773980652201162,
      longitude: 106.6612504946665,
      capacity: 30,
      floor: 2,
    },
  ];
  await prisma.building.create({ data: {
    name: "B10",
    rooms: {
      create: b10Rooms
  }}});
  console.log("🌱 B10 building's room data seeded successfully.");

  const c4Rooms = [
    // Floor 1
    {
      name: "C4-101",
      description: "Room 101 on floor 1 of C4 building",
      latitude: 10.775084234659447,
      longitude: 106.6602196702129,
      capacity: 30,
      floor: 1,
    },
    {
      name: "C4-102",
      description: "Room 102 on floor 1 of C4 building",
      latitude: 10.775138266537354,
      longitude: 106.66033346670609,
      capacity: 30,
      floor: 1,
    },
    {
      name: "C4-103",
      description: "Room 103 on floor 1 of C4 building",
      latitude: 10.775177393063561,
      longitude: 106.66040364121021,
      capacity: 30,
      floor: 1,
    },
    {
      name: "C4-104",
      description: "Room 104 on floor 1 of C4 building",
      latitude: 10.77524633026405,
      longitude: 106.66054209361026,
      capacity: 30,
      floor: 1,
    },
  
    // Floor 2
    {
      name: "C4-201",
      description: "Room 201 on floor 2 of C4 building",
      latitude: 10.775084234659447,
      longitude: 106.6602196702129,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C4-202",
      description: "Room 202 on floor 2 of C4 building",
      latitude: 10.775138266537354,
      longitude: 106.66033346670609,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C4-203",
      description: "Room 203 on floor 2 of C4 building",
      latitude: 10.775177393063561,
      longitude: 106.66040364121021,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C4-204",
      description: "Room 204 on floor 2 of C4 building",
      latitude: 10.77524633026405,
      longitude: 106.66054209361026,
      capacity: 30,
      floor: 2,
    },
  
    // Floor 3
    {
      name: "C4-301",
      description: "Room 301 on floor 3 of C4 building",
      latitude: 10.775084234659447,
      longitude: 106.6602196702129,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C4-302",
      description: "Room 302 on floor 3 of C4 building",
      latitude: 10.775138266537354,
      longitude: 106.66033346670609,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C4-303",
      description: "Room 303 on floor 3 of C4 building",
      latitude: 10.775177393063561,
      longitude: 106.66040364121021,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C4-304",
      description: "Room 304 on floor 3 of C4 building",
      latitude: 10.77524633026405,
      longitude: 106.66054209361026,
      capacity: 30,
      floor: 3,
    },
  ];
  await prisma.building.create({ data: {
    name: "C4",
    rooms: {
      create: c4Rooms
  }}});
  console.log("🌱 C4 building's room data seeded successfully.");

  const c5Rooms = [
    // Floor 1
    {
      name: "C5-101",
      description: "Room 101 on floor 1 of C5 building",
      latitude: 10.77534321495317,
      longitude: 106.66005466529859,
      capacity: 30,
      floor: 1,
    },
    {
      name: "C5-102",
      description: "Room 102 on floor 1 of C5 building",
      latitude: 10.77539724678459,
      longitude: 106.6601703584,
      capacity: 30,
      floor: 1,
    },
    {
      name: "C5-103",
      description: "Room 103 on floor 1 of C5 building",
      latitude: 10.7754792260965,
      longitude: 106.66030312097537,
      capacity: 30,
      floor: 1,
    },
    {
      name: "C5-104",
      description: "Room 104 on floor 1 of C5 building",
      latitude: 10.77550903674984,
      longitude: 106.66036950226307,
      capacity: 30,
      floor: 1,
    },
  
    // Floor 2
    {
      name: "C5-201",
      description: "Room 201 on floor 2 of C5 building",
      latitude: 10.77534321495317,
      longitude: 106.66005466529859,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C5-202",
      description: "Room 202 on floor 2 of C5 building",
      latitude: 10.77539724678459,
      longitude: 106.6601703584,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C5-203",
      description: "Room 203 on floor 2 of C5 building",
      latitude: 10.7754792260965,
      longitude: 106.66030312097537,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C5-204",
      description: "Room 204 on floor 2 of C5 building",
      latitude: 10.77550903674984,
      longitude: 106.66036950226307,
      capacity: 30,
      floor: 2,
    },
  
    // Floor 3
    {
      name: "C5-301",
      description: "Room 301 on floor 3 of C5 building",
      latitude: 10.77534321495317,
      longitude: 106.66005466529859,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C5-302",
      description: "Room 302 on floor 3 of C5 building",
      latitude: 10.77539724678459,
      longitude: 106.6601703584,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C5-303",
      description: "Room 303 on floor 3 of C5 building",
      latitude: 10.7754792260965,
      longitude: 106.66030312097537,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C5-304",
      description: "Room 304 on floor 3 of C5 building",
      latitude: 10.77550903674984,
      longitude: 106.66036950226307,
      capacity: 30,
      floor: 3,
    },
  ];
  await prisma.building.create({ data: {
    name: "C5",
    rooms: {
      create: c5Rooms
  }}});
  console.log("🌱 C5 building's room data seeded successfully.");

  const c6Rooms = [
    // Floor 1
    {
      name: "C6-101",
      description: "Computer Lab on floor 1 of C6 building",
      latitude: 10.775667358638668,
      longitude: 106.6599888005712,
      capacity: 30,
      floor: 1,
    },
    {
      name: "C6-102",
      description: "Computer Lab on floor 1 of C6 building",
      latitude: 10.775725326716342,
      longitude: 106.66008938341123,
      capacity: 30,
      floor: 1,
    },
    {
      name: "C6-103",
      description: "Room 103 on floor 1 of C6 building",
      latitude: 10.775712152154219,
      longitude: 106.66023019938723,
      capacity: 30,
      floor: 1,
    },
    {
      name: "C6-104",
      description: "Room 104 on floor 1 of C6 building",
      latitude: 10.775681117129894,
      longitude: 106.66017454664892,
      capacity: 30,
      floor: 1,
    },
    {
      name: "C6-105",
      description: "Room 105 on floor 1 of C6 building",
      latitude: 10.775649443328726,
      longitude: 106.6600873026708,
      capacity: 30,
      floor: 1,
    },
    {
      name: "C6-106",
      description: "Room 106 on floor 1 of C6 building",
      latitude: 10.775605658951038,
      longitude: 106.66000100699681,
      capacity: 30,
      floor: 1,
    },
  
    // Floor 2
    {
      name: "C6-201",
      description: "Lab Room on floor 2 of C6 building",
      latitude: 10.7758739546136,
      longitude: 106.6600806645421,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C6-202",
      description: "Lab Room on floor 2 of C6 building",
      latitude: 10.77595779695867,
      longitude: 106.66010342384074,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C6-203",
      description: "Room 203 on floor 2 of C6 building",
      latitude: 10.775767754276325,
      longitude: 106.6602731702764,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C6-204",
      description: "Room 204 on floor 2 of C6 building",
      latitude: 10.775746327887953,
      longitude: 106.6602172203339,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C6-205",
      description: "Room 205 on floor 2 of C6 building",
      latitude: 10.77570068035979,
      longitude: 106.66014135600513,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C6-206",
      description: "Room 206 on floor 2 of C6 building",
      latitude: 10.775672732890166,
      longitude: 106.66007876793387,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C6-207",
      description: "Room 207 on floor 2 of C6 building",
      latitude: 10.775651306495027,
      longitude: 106.66004083576948,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C6-208",
      description: "Computer Lab on floor 2 of C6 building",
      latitude: 10.775607522116802,
      longitude: 106.65987867576669,
      capacity: 30,
      floor: 2,
    },
    {
      name: "C6-209",
      description: "Computer Lab on floor 2 of C6 building",
      latitude: 10.775539516581809,
      longitude: 106.65989669354478,
      capacity: 30,
      floor: 2,
    },
  
    // Floor 3
    {
      name: "C6-301",
      description: "Lab Room on floor 3 of C6 building",
      latitude: 10.7758739546136,
      longitude: 106.6600806645421,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C6-302",
      description: "Lab Room on floor 3 of C6 building",
      latitude: 10.77595779695867,
      longitude: 106.66010342384074,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C6-303",
      description: "Room 303 on floor 3 of C6 building",
      latitude: 10.775767754276325,
      longitude: 106.6602731702764,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C6-304",
      description: "Room 304 on floor 3 of C6 building",
      latitude: 10.775746327887953,
      longitude: 106.6602172203339,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C6-305",
      description: "Room 305 on floor 3 of C6 building",
      latitude: 10.77570068035979,
      longitude: 106.66014135600513,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C6-306",
      description: "Room 306 on floor 3 of C6 building",
      latitude: 10.775672732890166,
      longitude: 106.66007876793387,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C6-307",
      description: "Room 307 on floor 3 of C6 building",
      latitude: 10.775651306495027,
      longitude: 106.66004083576948,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C6-308",
      description: "Computer Lab on floor 3 of C6 building",
      latitude: 10.775607522116802,
      longitude: 106.65987867576669,
      capacity: 30,
      floor: 3,
    },
    {
      name: "C6-309",
      description: "Computer Lab on floor 3 of C6 building",
      latitude: 10.775539516581809,
      longitude: 106.65989669354478,
      capacity: 30,
      floor: 3,
    },
  ];
  await prisma.building.create({ data: {
    name: "C6",
    rooms: {
      create: c6Rooms
  }}});
  console.log("🌱 C6 building's room data seeded successfully.");

  const bookings = [{
    date: new Date('2025-04-15T00:00:00Z'),
    schedule: encrypt(String(1)),
    userId: lecturer.id,
    roomId: 1, //A4-101
  },{
    date: new Date('2025-04-16T00:00:00Z'),
    schedule: encrypt(String(158)),
    userId: lecturer.id,
    roomId: 1, //A4-101
  },{
    date: new Date('2025-04-16T00:00:00Z'),
    schedule: encrypt(String(2)),
    userId: lecturer.id,
    roomId: 2, //A4-102
  },{
    date: new Date('2025-04-17T00:00:00Z'),
    schedule: encrypt(String(4)),
    userId: lecturer.id,
    roomId: 1, //A4-101
  }
  ,{
    date: new Date('2025-04-17T00:00:00Z'),
    schedule: encrypt(String(8)),
    userId: lecturer.id,
    roomId: 2, //A4-102
  },{
    date: new Date('2025-04-18T00:00:00Z'),
    schedule: encrypt(String(96)),
    userId: lecturer.id,
    roomId: 1, //A4-101
  }
  ,{
    date: new Date('2025-04-19T00:00:00Z'),
    schedule: encrypt(String(16)),
    userId: lecturer.id,
    roomId: 1, //A4-101
  }
  ,{
    date: new Date('2025-04-19T00:00:00Z'),
    schedule: encrypt(String(24)),
    userId: lecturer.id,
    roomId: 2, //A4-102
  },{
    date: new Date('2025-04-22T00:00:00Z'),
    schedule: encrypt(String(100)),
    userId: lecturer.id,
    roomId: 1, //A4-101
  }
  ]
  await prisma.booking.createMany({ data: bookings });
  console.log("🌱 Booking data seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Error seeding room data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
