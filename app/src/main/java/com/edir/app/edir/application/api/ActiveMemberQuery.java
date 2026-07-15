package com.edir.app.edir.application.api;

import org.springframework.modulith.NamedInterface;

import java.util.List;
import java.util.Optional;

@NamedInterface
public interface ActiveMemberQuery {
   Optional<List<MemberSummary>> findActiveMembers();
}
