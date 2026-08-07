package com.edir.app.inventory.application.ports.out.query;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StoreQueryService {
    private final StoreQueryRepository storeQueryRepository;

    public List<StoreView> findAll() {
        return storeQueryRepository.findStore();
    }

}
