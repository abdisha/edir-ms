package com.edir.app.edir.adapter.rest;

import com.edir.app.edir.application.edir.command.RegisterMemberCommand;
import com.edir.app.edir.application.edir.query.GetMemberDetailQuery;
import com.edir.app.edir.application.edir.query.MemberDetailView;
import com.edir.app.edir.application.edir.usecase.RegisterMemberUseCase;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@RestController
@RequestMapping(REST_VERSION + "members")
public class MemberController {
    private final RegisterMemberUseCase registerMemberUseCase;
    private final GetMemberDetailQuery getMemberDetailQuery;


    public MemberController(RegisterMemberUseCase registerMemberUseCase,
                            GetMemberDetailQuery getMemberDetailQuery) {
        this.registerMemberUseCase = registerMemberUseCase;
        this.getMemberDetailQuery = getMemberDetailQuery;
    }

    @PostMapping
    public ResponseEntity<UUID> registerMember(@Valid @RequestBody RegisterMemberCommand registerMemberCommand) {
        UUID memberId = registerMemberUseCase.execute(registerMemberCommand);
        return ResponseEntity
                .status(HttpStatus.CREATED).body(memberId);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberDetailView> getMember(@PathVariable UUID memberId) {
        var result = getMemberDetailQuery.execute(memberId);
        return result.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
