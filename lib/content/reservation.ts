import {
  bookableRooms,
  bookings,
  meetingPackages,
  reservationText,
  roomPrices,
  rooms,
} from "@/data/reservation";
import type {
  BookableRoom,
  Booking,
  MeetingPackage,
  ReservationText,
  Room,
  RoomPrice,
} from "@/types/content";

// TODO: ganti dengan fetch ke API dashboard (GET ruangan yang tampil sebagai kartu).
export async function getRooms(): Promise<Room[]> {
  return rooms;
}

// TODO: ganti dengan fetch ke API dashboard (GET semua ruangan yang bisa dipesan).
export async function getBookableRooms(): Promise<BookableRoom[]> {
  return bookableRooms;
}

// TODO: ganti dengan fetch ke API dashboard (GET jadwal terisi). Jadwal berubah terus,
// jadi nanti harus mengambil data segar, bukan hasil render statis.
export async function getBookings(): Promise<Booking[]> {
  return bookings;
}

// TODO: ganti dengan fetch ke API dashboard (GET harga sewa ruangan).
export async function getRoomPrices(): Promise<RoomPrice[]> {
  return roomPrices;
}

// TODO: ganti dengan fetch ke API dashboard (GET paket meeting).
export async function getMeetingPackages(): Promise<MeetingPackage[]> {
  return meetingPackages;
}

// TODO: ganti dengan fetch ke API dashboard (GET teks panel Reservasi).
export async function getReservationText(): Promise<ReservationText> {
  return reservationText;
}
