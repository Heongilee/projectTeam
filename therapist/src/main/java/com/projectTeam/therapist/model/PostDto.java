package com.projectTeam.therapist.model;

//import lombok.Data;

import javax.persistence.*;

@Entity
//@Data // Getter Setter를 자동으로 생성해주는 어노테이션
public class PostDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
//    private Long memberId;
    @Enumerated(EnumType.STRING)
    private Category postType;
    private String postTitle;
    private String postContent;

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

//    public Long getMemberId() {
//        return memberId;
//    }
//
//    public void setMemberId(Long memberId) {
//        this.memberId = memberId;
//    }

    public Category getPostType() {
        return postType;
    }

    public void setPostType(Category postType) {
        this.postType = postType;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostContent() {
        return postContent;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

}