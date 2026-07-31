package com.edir.app.event.adapter.persistance.jpa;

import com.edir.app.event.adapter.persistance.entity.MeetingEventEntity;
import com.edir.app.event.application.port.out.query.MeetingView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JpaMeetingEventRepository extends JpaRepository<MeetingEventEntity, UUID> {
    @Query(
        value = """
                SELECT new com.edir.app.event.application.port.out.query.MeetingView(
                    me.id,
                    me.name,
                    me.agenda,
                    me.location,
                    me.eventDate
                )
                FROM MeetingEventEntity me
            """)
    List<MeetingView> findAllMeetingView();

    @Query(
        value = """
                SELECT new com.edir.app.event.application.port.out.query.MeetingView(
                    me.id,
                    me.name,
                    me.agenda,
                    me.location,
                    me.eventDate
                )
                FROM MeetingEventEntity me where me.id =:id
            """)
    Optional<MeetingView> findMeetingViewById(UUID id);
}
