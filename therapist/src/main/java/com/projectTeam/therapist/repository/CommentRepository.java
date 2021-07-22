package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.PostDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<PostDto, Long>{
}