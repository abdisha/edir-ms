package com.edir.app.event.application.port.in.command;

import jakarta.validation.constraints.NotNull;

import java.time.ZonedDateTime;

public record UpInsertMeetingEventCommand(
  @NotNull
  String meetingName,
  @NotNull
  String agenda,
  @NotNull
  ZonedDateTime eventDate,
  @NotNull
  String location
) {
}
