package com.edir.app.inventory.application.out.query;

import java.util.List;

public interface StoreQueryRepository {
    List<StoreView> findStore();
}
