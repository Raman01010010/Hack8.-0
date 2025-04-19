// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Entities {
    struct Investor {
        uint id;
        string name;
        address wallet;
    }
    struct Startup {
        uint id;
        string name;
        address owner;
    }
    struct Document {
        uint id;
        string uri;
        address uploader;
    }

    uint private investorCount;
    uint private startupCount;
    uint private documentCount;

    mapping(uint => Investor) public investors;
    mapping(uint => Startup) public startups;
    mapping(uint => Document) public documents;

    event InvestorAdded(uint id, string name, address wallet);
    event StartupAdded(uint id, string name, address owner);
    event DocumentAdded(uint id, string uri, address uploader);

    function addInvestor(string memory _name, address _wallet) external {
        investorCount++;
        investors[investorCount] = Investor(investorCount, _name, _wallet);
        emit InvestorAdded(investorCount, _name, _wallet);
    }

    function getInvestor(uint _id) external view returns (uint, string memory, address) {
        Investor memory i = investors[_id];
        return (i.id, i.name, i.wallet);
    }

    function addStartup(string memory _name, address _owner) external {
        startupCount++;
        startups[startupCount] = Startup(startupCount, _name, _owner);
        emit StartupAdded(startupCount, _name, _owner);
    }

    function getStartup(uint _id) external view returns (uint, string memory, address) {
        Startup memory s = startups[_id];
        return (s.id, s.name, s.owner);
    }

    function addDocument(string memory _uri) external {
        documentCount++;
        documents[documentCount] = Document(documentCount, _uri, msg.sender);
        emit DocumentAdded(documentCount, _uri, msg.sender);
    }

    function getDocument(uint _id) external view returns (uint, string memory, address) {
        Document memory d = documents[_id];
        return (d.id, d.uri, d.uploader);
    }

    function getInvestorCount() external view returns (uint) {
        return investorCount;
    }

    function getStartupCount() external view returns (uint) {
        return startupCount;
    }

    function getDocumentCount() external view returns (uint) {
        return documentCount;
    }
}