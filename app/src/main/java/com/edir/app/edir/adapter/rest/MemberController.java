package com.edir.app.edir.adapter.rest;

import com.edir.app.edir.adapter.rest.request.AppointmentRequest;
import com.edir.app.edir.application.ports.in.commands.RegisterMemberCommand;
import com.edir.app.edir.application.ports.in.usecases.AppointMemberUseCase;
import com.edir.app.edir.application.ports.in.usecases.MemberDeceasedUseCase;
import com.edir.app.edir.application.ports.in.usecases.RegisterMemberUseCase;
import com.edir.app.edir.application.ports.in.usecases.RevokeAppointmentUseCase;
import com.edir.app.edir.application.ports.out.query.MemberDetailView;
import com.edir.app.edir.application.ports.out.query.MemberQueryService;
import com.edir.app.shared.domain.entity.PageQuery;
import com.edir.app.shared.domain.entity.PageResult;
import com.edir.app.shared.domain.valueobjects.MemberId;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@RestController
@AllArgsConstructor
@RequestMapping(REST_VERSION + "members")
public class MemberController {
    private final RegisterMemberUseCase registerMemberUseCase;
    private final MemberQueryService memberQueryService;
    private final AppointMemberUseCase appointMemberUseCase;
    private final MemberDeceasedUseCase memberDeceasedUseCase;
    private final RevokeAppointmentUseCase revokeAppointmentUseCase;

    @PostMapping
    public ResponseEntity<UUID> registerMember(@Valid @RequestBody RegisterMemberCommand registerMemberCommand) {
        UUID memberId = registerMemberUseCase.execute(registerMemberCommand);
        return ResponseEntity
                .status(HttpStatus.CREATED).body(memberId);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberDetailView> getMember(@PathVariable UUID memberId) {
        var result = memberQueryService.getMember(memberId);
        return result.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping()
    public ResponseEntity<PageResult<MemberDetailView>> getMembers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {

       return ResponseEntity.ok( memberQueryService.getMembers(new PageQuery(page,size)));
    }

    @PutMapping("/{memberId}/revoke")
    public ResponseEntity<Void> revoke(@PathVariable UUID memberId){
        revokeAppointmentUseCase.execute(new MemberId(memberId));

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{memberId}/appointment")
    public ResponseEntity<Void> appoint(@PathVariable UUID memberId,
                                       @Valid @RequestBody AppointmentRequest appointmentRequest){
                appointMemberUseCase.execute(new MemberId(memberId),appointmentRequest.role());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{memberId}/deceased")
    public ResponseEntity<Void> deceased(@PathVariable UUID memberId){
        memberDeceasedUseCase.execute(new MemberId(memberId));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
