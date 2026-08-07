package com.edir.app.inventory.application.ports.out.query;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class ItemQueryService {
    private final ItemQueryRepository queryRepository;

    public List<ItemView> findAll() {
        return queryRepository.findAllItems();
    }
    public List<ItemView> findAllUnAllocatedItems() {
        return queryRepository.findAllUnAllocatedItems();
    }

    public Optional<ItemView> findById(UUID id) {
        return queryRepository.findItemById(id);
    }


}
