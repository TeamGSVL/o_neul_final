package com.gsvl.oneul.season;

import com.gsvl.oneul.season.model.SeasonEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeasonService {
    @Autowired private SeasonMapper mapper;

    public List<SeasonEntity> selSeasonList(int seasonlist, SeasonEntity entity) {
        entity.setF_season(seasonlist);
        return mapper.selSeasonList(entity);
    }
}
