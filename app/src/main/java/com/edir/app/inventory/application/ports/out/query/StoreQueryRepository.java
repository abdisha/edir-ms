package com.edir.app.inventory.application.ports.out.query;

import java.util.List;

public interface StoreQueryRepository {
    List<StoreView> findStore();
}
