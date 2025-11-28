import { eventBus } from "../eventBus.js";
import { UserModel } from "../../models/user.model.js";
import { sendNewActivityEmail } from "../../services/email.service.js";

interface ActivityCreatedEvent {
  activity: any;
  trip: any;
}

eventBus.on("activity:created", async ({ activity, trip }: ActivityCreatedEvent) => {
  try {
    if (!trip.members || trip.members.length === 0) return;

    const users = await UserModel.getManyByIds(trip.members);

    if (!users || users.length === 0) return;

    await Promise.all(
      users.map((user: any) =>
        sendNewActivityEmail({
          to: user.mail, 
          trip,
          activity,
        })
      )
    );

    console.log(
      `[Observer] Emails enviados: ${users.length} por nueva actividad "${activity.title}" en trip "${trip.nombre || trip.name}".`
    );
  } catch (err) {
    console.error("[Observer] Error enviando mails de nueva actividad:", err);
  }
});
