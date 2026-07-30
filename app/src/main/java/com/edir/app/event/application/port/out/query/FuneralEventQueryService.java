package com.edir.app.event.application.port.out.query;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Component
public class FuneralEventQueryService {
    private FuneralEventQueryRepository funeralEventQueryRepository;

    public List<FuneralEventView> findAll() {
        return funeralEventQueryRepository.findAll();
    }
    public Optional<FuneralEventView> findById(UUID id){
        return funeralEventQueryRepository.findById(id);
    }

    public List<ItemIssueView> findByFuneralId(UUID funeralId){
        return funeralEventQueryRepository.findByFuneralId(funeralId);
    }
}
